export default {
 async fetch(request, env) {
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/api/")) return env.ASSETS.fetch(request);
  const origin = request.headers.get("Origin") || "*";
  const headers={"Access-Control-Allow-Origin":origin,"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Content-Type":"application/json; charset=utf-8"};
  if(request.method==="OPTIONS") return new Response(null,{headers});
  if(request.method!=="POST") return Response.json({error:"Method not allowed"},{status:405,headers});
  try {
   const body=await request.json();
   if(url.pathname==="/api/submit"){
    const a=body?.answers;
    if(!Array.isArray(a)||a.length!==6||a.some(v=>!Number.isInteger(v)||v<0||v>4)) return Response.json({error:"请提交完整的 6 道题答案。"},{status:400,headers});
    const avg=a.reduce((x,y)=>x+y,0)/6, level=Math.max(0,Math.min(4,Math.round(avg)));
    await env.DB.prepare("INSERT INTO responses (answers_json, average_score, level) VALUES (?, ?, ?)").bind(JSON.stringify(a),avg,level).run();
    return Response.json({ok:true,level,averageScore:+avg.toFixed(2)},{headers});
   }
   if(url.pathname==="/api/stats"){
    if(!env.ADMIN_PIN||body?.pin!==env.ADMIN_PIN) return Response.json({error:"管理员口令不正确。"},{status:401,headers});
    const total=await env.DB.prepare("SELECT COUNT(*) total, COALESCE(AVG(average_score),0) avg FROM responses").first();
    const lr=await env.DB.prepare("SELECT level, COUNT(*) n FROM responses GROUP BY level").all();
    const ar=await env.DB.prepare("SELECT answers_json FROM responses").all();
    const levels=[0,0,0,0,0], sums=[0,0,0,0,0,0];let valid=0;
    for(const x of lr.results||[]) levels[x.level]=x.n;
    for(const row of ar.results||[]){try{const a=JSON.parse(row.answers_json);if(a.length===6){a.forEach((v,i)=>sums[i]+=v);valid++}}catch{}}
    return Response.json({total:total.total,averageScore:+Number(total.avg).toFixed(2),levels,questionAverages:sums.map(x=>valid?+(x/valid).toFixed(2):0)},{headers});
   }
   return Response.json({error:"Not found"},{status:404,headers});
  } catch(e){return Response.json({error:"服务器处理失败，请检查数据库配置。"},{status:500,headers});}
 }
};