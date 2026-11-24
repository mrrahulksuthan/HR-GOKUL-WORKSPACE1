import { SUPABASE_URL, SUPABASE_ANON_KEY, APP_CONFIGURED } from './config.js';

let client;
let preview=false;
const previewData={categories:[],tasks:[],daily_activities:[],follow_ups:[],daily_summaries:[],notifications:[],task_history:[],user_settings:[]};
export function enablePreview(categories=[]){preview=true;previewData.categories=categories.map(x=>({...x}));}
const stamp=()=>new Date().toISOString();
export async function getClient() {
  if (!APP_CONFIGURED) return null;
  if (!client) {
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth:{ persistSession:true, autoRefreshToken:true, detectSessionInUrl:true } });
  }
  return client;
}
export async function list(table, query={}) {
  if(preview){let rows=[...(previewData[table]||[])];if(query.filters)rows=rows.filter(x=>Object.entries(query.filters).every(([k,v])=>x[k]===v));if(query.order)rows.sort((a,b)=>String(b[query.order]||'').localeCompare(String(a[query.order]||''))*(query.ascending?1:-1));return query.limit?rows.slice(0,query.limit):rows;}
  const c=await getClient(); if(!c) throw new Error('Supabase is not configured. Follow SETUP.md first.');
  let q=c.from(table).select('*');
  if(query.order) q=q.order(query.order,{ascending:query.ascending??false});
  if(query.limit) q=q.limit(query.limit);
  if(query.filters) for(const [k,v] of Object.entries(query.filters)) q=q.eq(k,v);
  const {data,error}=await q; if(error) throw error; return data||[];
}
export async function save(table, row, id) {
  if(preview){let rows=previewData[table]||(previewData[table]=[]),result;if(id){let i=rows.findIndex(x=>x.id===id);if(i<0)throw new Error('Record was not found.');rows[i]={...rows[i],...row,updated_at:stamp()};result=rows[i];}else{result={...row,id:crypto.randomUUID(),created_at:stamp(),updated_at:stamp()};rows.unshift(result);if(table==='tasks')previewData.task_history.unshift({id:crypto.randomUUID(),task_id:result.id,action:'task_created',details:result.title,created_at:stamp()});}return result;}
  const c=await getClient(); if(!c) throw new Error('Supabase is not configured. Follow SETUP.md first.');
  const result=id ? await c.from(table).update(row).eq('id',id).select().single() : await c.from(table).insert(row).select().single();
  if(result.error) throw result.error; return result.data;
}
export async function remove(table,id) { if(preview){previewData[table]=(previewData[table]||[]).filter(x=>x.id!==id);return;} const c=await getClient(); const {error}=await c.from(table).delete().eq('id',id); if(error) throw error; }
export async function invoke(name,body={}) { if(preview)throw new Error('Cloud backup and restore are available after connecting Supabase and Google Drive.'); const c=await getClient(); const {data,error}=await c.functions.invoke(name,{body}); if(error) throw error; return data; }
