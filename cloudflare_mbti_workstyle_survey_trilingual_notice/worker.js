const ITEMS = [{"pole":"E","reverse":false},{"pole":"I","reverse":false},{"pole":"S","reverse":false},{"pole":"N","reverse":false},{"pole":"T","reverse":false},{"pole":"F","reverse":false},{"pole":"J","reverse":false},{"pole":"P","reverse":false},{"pole":"E","reverse":true},{"pole":"I","reverse":true},{"pole":"S","reverse":true},{"pole":"N","reverse":true},{"pole":"T","reverse":true},{"pole":"F","reverse":true},{"pole":"J","reverse":true},{"pole":"P","reverse":true},{"pole":"E","reverse":false},{"pole":"I","reverse":false},{"pole":"S","reverse":false},{"pole":"N","reverse":false},{"pole":"T","reverse":false},{"pole":"F","reverse":false},{"pole":"J","reverse":false},{"pole":"P","reverse":false},{"pole":"E","reverse":true},{"pole":"I","reverse":true},{"pole":"S","reverse":true},{"pole":"N","reverse":true},{"pole":"T","reverse":true},{"pole":"F","reverse":true},{"pole":"J","reverse":true},{"pole":"P","reverse":true},{"pole":"E","reverse":false},{"pole":"I","reverse":false},{"pole":"S","reverse":false},{"pole":"N","reverse":false},{"pole":"T","reverse":false},{"pole":"F","reverse":false},{"pole":"J","reverse":false},{"pole":"P","reverse":false},{"pole":"E","reverse":true},{"pole":"I","reverse":true},{"pole":"S","reverse":true},{"pole":"N","reverse":true},{"pole":"T","reverse":true},{"pole":"F","reverse":true},{"pole":"J","reverse":true},{"pole":"P","reverse":true},{"pole":"E","reverse":false},{"pole":"I","reverse":false},{"pole":"S","reverse":false},{"pole":"N","reverse":false},{"pole":"T","reverse":false},{"pole":"F","reverse":false},{"pole":"J","reverse":false},{"pole":"P","reverse":false},{"pole":"E","reverse":true},{"pole":"I","reverse":true},{"pole":"S","reverse":true},{"pole":"N","reverse":true},{"pole":"T","reverse":true},{"pole":"F","reverse":true},{"pole":"J","reverse":true},{"pole":"P","reverse":true},{"pole":"E","reverse":false},{"pole":"I","reverse":false},{"pole":"S","reverse":false},{"pole":"N","reverse":false},{"pole":"T","reverse":false},{"pole":"F","reverse":false},{"pole":"J","reverse":false},{"pole":"P","reverse":false},{"pole":"E","reverse":true},{"pole":"I","reverse":true},{"pole":"S","reverse":true},{"pole":"N","reverse":true},{"pole":"T","reverse":true},{"pole":"F","reverse":true},{"pole":"J","reverse":true},{"pole":"P","reverse":true},{"pole":"E","reverse":false},{"pole":"I","reverse":false},{"pole":"S","reverse":false},{"pole":"N","reverse":false},{"pole":"T","reverse":false},{"pole":"F","reverse":false},{"pole":"J","reverse":false},{"pole":"P","reverse":false},{"pole":"E","reverse":true},{"pole":"I","reverse":true},{"pole":"S","reverse":true},{"pole":"N","reverse":true},{"pole":"T","reverse":true},{"pole":"F","reverse":true},{"pole":"J","reverse":true},{"pole":"P","reverse":true},{"pole":"E","reverse":false},{"pole":"I","reverse":false},{"pole":"S","reverse":false},{"pole":"N","reverse":false},{"pole":"T","reverse":false},{"pole":"F","reverse":false},{"pole":"J","reverse":false},{"pole":"P","reverse":false}];
const DIMENSIONS = {
 EI:{left:"E 外向互动",right:"I 内向思考",leftPole:"E",rightPole:"I",note:"E 倾向通过互动整理思路；I 倾向先独立思考、再交流。两者都能有效协作。"},
 SN:{left:"S 具体事实",right:"N 整体可能",leftPole:"S",rightPole:"N",note:"S 倾向具体证据、细节和可执行步骤；N 倾向模式、趋势和潜在可能。"},
 TF:{left:"T 逻辑标准",right:"F 人与价值",leftPole:"T",rightPole:"F",note:"T 倾向逻辑一致性和明确标准；F 倾向人员影响、价值和关系质量。"},
 JP:{left:"J 计划结构",right:"P 灵活探索",leftPole:"J",rightPole:"P",note:"J 倾向计划、收敛和明确行动；P 倾向保留选择、适应变化和持续探索。"}
};
const TIPS = {
 E:"安排讨论时给外向倾向同事实时交流机会，同时把关键结论书面沉淀。",
 I:"提前分享议题，并给内向倾向同事独立思考和书面反馈的时间。",
 S:"说明背景时提供事实、例子、限制和明确交付物。",
 N:"说明任务时补充目标、整体方向，以及允许探索的空间。",
 T:"反馈时讲清证据、标准和改进动作，避免把问题个人化。",
 F:"反馈时说明影响、倾听顾虑，并保留尊重与理解的空间。",
 J:"协作时尽早明确负责人、时间点、优先级和决策节点。",
 P:"协作时说明哪些内容可调整、哪些是硬性约束，并留出探索空间。"
};
function report(answers, items) {
 const sums={E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0}, counts={E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0};
 items.forEach((it,i)=>{let v=answers[i];if(it.reverse)v=6-v;sums[it.pole]+=v;counts[it.pole]++;});
 const axes=[
  makeAxis("EI","E","I",sums,counts),makeAxis("SN","S","N",sums,counts),
  makeAxis("TF","T","F",sums,counts),makeAxis("JP","J","P",sums,counts)
 ];
 const type=axes.map(a=>a.leftPct>=50?a.leftCode:a.rightCode).join("");
 const tips=axes.map(a=>TIPS[a.leftPct>=50?a.leftCode:a.rightCode]);
 const names={"E":"更偏互动表达","I":"更偏独立思考","S":"更偏具体事实","N":"更偏整体可能","T":"更偏逻辑标准","F":"更偏人员与价值","J":"更偏计划结构","P":"更偏灵活探索"};
 const summary="你的自评倾向为："+axes.map(a=>names[a.leftPct>=50?a.leftCode:a.rightCode]).join("、")+"。这描述的是偏好，不是能力高低。";
 return {type,summary,axes:axes.map(a=>({...a,note:DIMENSIONS[a.dim].note})),tips};
}
function makeAxis(dim,leftCode,rightCode,sums,counts){
 const l=counts[leftCode]?sums[leftCode]/counts[leftCode]:3, r=counts[rightCode]?sums[rightCode]/counts[rightCode]:3;
 const pct=Math.round((l/(l+r))*100);
 const d=DIMENSIONS[dim];
 return {dim,left:d.left,right:d.right,leftCode,rightCode,leftPct:pct};
}
export default {
 async fetch(request, env) {
  const url=new URL(request.url);
  if(!url.pathname.startsWith("/api/")) return env.ASSETS.fetch(request);
  const origin = request.headers.get("Origin") || "*";
  const headers={"Access-Control-Allow-Origin":origin,"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Content-Type":"application/json; charset=utf-8"};
  if(request.method==="OPTIONS")return new Response(null,{headers});
  if(request.method!=="POST")return Response.json({error:"Method not allowed"},{status:405,headers});
  try {
   const body=await request.json();
   if(url.pathname==="/api/submit"){
    const a=body?.answers;
    if(!Array.isArray(a)||a.length!==104||a.some(v=>!Number.isInteger(v)||v<1||v>5))return Response.json({error:"请完成全部 104 道题。"}, {status:400,headers});
    // Scoring metadata embedded in worker below is generated at build time.
    const items=ITEMS;
    const r=report(a,items);
    const scoreJson=JSON.stringify({answers:a,type:r.type,axes:r.axes.map(x=>x.leftPct)});
    await env.DB.prepare("INSERT INTO responses (answers_json, type_code, ei, sn, tf, jp) VALUES (?, ?, ?, ?, ?, ?)").bind(JSON.stringify(a),r.type,r.axes[0].leftPct,r.axes[1].leftPct,r.axes[2].leftPct,r.axes[3].leftPct).run();
    return Response.json({ok:true,type:r.type,summary:r.summary,axes:r.axes,tips:r.tips},{headers});
   }
   if(url.pathname==="/api/stats"){
    if(!env.ADMIN_PIN||body?.pin!==env.ADMIN_PIN)return Response.json({error:"管理员口令不正确。"}, {status:401,headers});
    const total=await env.DB.prepare("SELECT COUNT(*) AS n, AVG(ei) ei, AVG(sn) sn, AVG(tf) tf, AVG(jp) jp FROM responses").first();
    const types=await env.DB.prepare("SELECT type_code, COUNT(*) AS n FROM responses GROUP BY type_code").all();
    const axes=[
      {dim:"EI",left:"E 外向互动",right:"I 内向思考",leftPct:Math.round(Number(total.ei||50))},
      {dim:"SN",left:"S 具体事实",right:"N 整体可能",leftPct:Math.round(Number(total.sn||50))},
      {dim:"TF",left:"T 逻辑标准",right:"F 人与价值",leftPct:Math.round(Number(total.tf||50))},
      {dim:"JP",left:"J 计划结构",right:"P 灵活探索",leftPct:Math.round(Number(total.jp||50))}
    ];
    const typeCounts={};for(const t of types.results||[])typeCounts[t.type_code]=t.n;
    const all=["ISTJ","ISFJ","INFJ","INTJ","ISTP","ISFP","INFP","INTP","ESTP","ESFP","ENFP","ENTP","ESTJ","ESFJ","ENFJ","ENTJ"];
    return Response.json({total:total.n,axes,types:all.map(type=>({type,count:typeCounts[type]||0}))},{headers});
   }
   return Response.json({error:"Not found"},{status:404,headers});
  }catch(e){return Response.json({error:"服务器处理失败，请检查数据库配置。"}, {status:500,headers});}
 }
};