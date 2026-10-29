import React from 'react'
import { Activity, ArrowDownRight, Cpu, ShieldCheck, Zap, Box, MapPin, TerminalSquare, Wrench, Package, Truck, AlertTriangle, CheckCircle2 } from 'lucide-react'

export function ProjectVisual({ id }) {
  switch (id) {
    case 'gridsense': return <GridSenseVisual />
    case 'maintenance': return <MaintenanceVisual />
    case 'warehouse': return <WarehouseVisual />
    case 'kubernetes': return <KubernetesVisual />
    case 'bhoomiseva': return <BhoomiVisual />
    case 'nids': return <NidsVisual />
    default: return null
  }
}

function VisualTopline({ name, icon: Icon }) {
  return <div className="visual-topline"><div className="visual-topline-left"><Icon size={13}/>{name}</div><span><i/><i/><i/></span></div>
}

function GridSenseVisual() {
  const lines = [[5,7],[7,2],[2,4],[4,8],[8,10],[1,3],[3,4],[7,9],[9,6],[3,8],[6,10],[4,5],[2,1],[0,2],[10,11],[11,8],[6,4],[0,1]]
  const nodes = [[54,113],[108,70],[180,63],[235,112],[174,175],[86,182],[299,183],[298,47],[367,144],[381,69],[320,236],[405,227]]
  return <div className="visual-screen visual-grid">
    <VisualTopline name="GRID INTELLIGENCE / OVERVIEW" icon={Zap}/>
    <div className="visual-kpis"><span><small>NODES ONLINE</small><strong>~22K</strong></span><span><small>SYSTEM RISK</small><strong>LOW <i className="visual-green-dot"/></strong></span><span><small>MODEL CONFIDENCE</small><strong>~98%</strong></span></div>
    <svg className="grid-network" viewBox="0 0 470 270" role="img" aria-label="Power grid topology diagram with connected nodes">
      <defs><linearGradient id="riskpath" x1="0%" x2="100%"><stop stopColor="#d5fc91"/><stop offset="100%" stopColor="#d5fc91" stopOpacity=".08"/></linearGradient></defs>
      <g stroke="#a8d486" strokeOpacity=".35" strokeWidth="1.5">{lines.map(([a,b],i)=><line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}/>)}</g>
      <path d="M108 70L180 63L235 112L174 175L299 183" fill="none" stroke="#d7ff82" strokeWidth="3.2" strokeDasharray="5 5" className="moving-dash"/>
      {nodes.map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r={i===3?17:8} fill={i===3?'#fdbf96':i%3===0?'#d9fc9a':'#6f8f75'} fillOpacity={i===3?'.15':'.5'}/><circle cx={x} cy={y} r={i===3?7:3.5} fill={i===3?'#fdbf96':'#ddff9b'}/></g>)}
      <rect x="239" y="86" rx="5" width="112" height="23" fill="#d6ff8a"/><text x="250" y="101" fill="#1d2a1f" fontSize="9" fontWeight="700">CASCADE ALERT 01</text>
    </svg>
    <div className="visual-footer"><span><Activity size={12}/> ILLUSTRATIVE UI PREVIEW</span><span>SIMULATION <span className="blink">●</span></span></div>
  </div>
}

function KubernetesVisual() {
  return <div className="visual-screen visual-kube">
    <VisualTopline name="K8S / AUTONOMOUS CONTROL" icon={TerminalSquare}/>
    <div className="kube-banner"><span><i/> CLUSTER WORKFLOW</span><span>demo-namespace ▾</span></div>
    <div className="kube-cluster"><div className="cluster-node main-cluster"><Cpu size={28}/><strong>AI SRE AGENT</strong><small>OBSERVING</small></div><div className="cluster-link"/><div className="cluster-children"><span><Box size={19}/> DETECT <i>✓</i></span><span><Activity size={19}/> DIAGNOSE <i>✓</i></span><span><ShieldCheck size={19}/> VERIFY <i>✓</i></span></div></div>
    <div className="kube-logs"><div><span className="logtime">14:32:01</span><span className="log-green">[OK]</span> cluster metrics ingested</div><div><span className="logtime">14:32:04</span><span className="log-yellow">[WARN]</span> OOMKilled detected</div><div><span className="logtime">14:32:06</span><span className="log-green">[AI]</span> remediation proposed</div><div><span className="logtime">14:32:10</span><span className="log-green">[OK]</span> health check passed<span className="blink"> ▌</span></div></div>
  </div>
}

function BhoomiVisual() {
  return <div className="visual-screen visual-bhoomi">
    <VisualTopline name="BHOOMISEVA / LAND EXPLORER" icon={MapPin}/>
    <div className="bhoomi-stat"><span>Parcel Intelligence</span><strong>LAND RECORDS</strong><small>Explore, analyze, resolve.</small></div>
    <svg viewBox="0 0 470 270" className="bhoomi-map" role="img" aria-label="Stylized cadastral map of land parcels">
      <defs><pattern id="mapdots" width="13" height="13" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".55" fill="#da8e8e" opacity=".3"/></pattern></defs>
      <rect width="470" height="270" fill="url(#mapdots)"/>
      <g transform="rotate(-12 235 135)" stroke="#ffbaac" strokeWidth="2" strokeLinejoin="round">
        <path d="M-10 40L120 30L135 135L10 155Z" fill="#925d83"/><path d="M120 30L245 10L253 127L135 135Z" fill="#bf7b91"/>
        <path d="M245 10L360 15L370 113L253 127Z" fill="#996387"/><path d="M360 15L500 20L495 132L370 113Z" fill="#d79897"/>
        <path d="M10 155L135 135L159 278L-14 284Z" fill="#c48a91"/><path d="M135 135L253 127L267 268L159 278Z" fill="#895e81"/>
        <path d="M253 127L370 113L386 265L267 268Z" fill="#efac99"/><path d="M370 113L495 132L503 277L386 265Z" fill="#9d6886"/>
        <path d="M135 135L253 127L267 268L159 278Z" fill="#d7ff8b" fillOpacity=".57" stroke="#ddff9f" strokeWidth="4"/>
      </g>
      <path d="M-10 116Q100 127 200 107T470 120" stroke="#f7d9b1" strokeWidth="8" strokeOpacity=".75" fill="none"/>
      <circle cx="205" cy="174" r="26" fill="#d7fc8e" fillOpacity=".13" stroke="#d7fc8e" strokeDasharray="5 5"/><circle cx="205" cy="174" r="7" fill="#e7ffa9"/>
    </svg>
    <div className="bhoomi-tooltip"><small>SELECTED PARCEL</small><strong>TN / VLR / 0082</strong><span><ArrowDownRight size={11}/> FORECAST READY</span></div>
  </div>
}

function NidsVisual() {
  const blips = [[71,58],[102,106],[164,76],[209,124],[121,191],[243,186],[318,109],[346,180],[380,62],[285,49]]
  return <div className="visual-screen visual-nids">
    <VisualTopline name="NETWORK DEFENSE / SOC MONITOR" icon={ShieldCheck}/>
    <div className="nids-metrics"><span><small>THREATS DETECTED</small><strong>03</strong></span><span><small>RISK LEVEL</small><strong>MEDIUM</strong></span><span><small>STATUS</small><strong className="signal-active">MONITORING</strong></span></div>
    <svg viewBox="0 0 470 245" className="nids-radar" role="img" aria-label="Threat-detection radar visualization">
      <defs><linearGradient id="scanbeam" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#8ae9ed" stopOpacity=".35"/><stop offset="1" stopColor="#8ae9ed" stopOpacity="0"/></linearGradient></defs>
      {[42,80,119].map(r=><circle key={r} cx="235" cy="120" r={r} fill="none" stroke="#8ce4ef" strokeOpacity=".19" strokeWidth="1" />)}
      <path d="M116 120H354M235 1V239" stroke="#8ce4ef" strokeOpacity=".2" strokeDasharray="4 4"/>
      <path d="M235 120L252 1A120 120 0 0 1 345 165Z" fill="url(#scanbeam)" className="radar-sweep" style={{transformOrigin:'235px 120px'}}/>
      {blips.map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r={i%3===0?7:3} fill={i%3===0?'#f6a9aa':'#9ce5ea'} opacity={i%3===0?'.9':'.5'}/>{i%3===0&&<circle cx={x} cy={y} r="13" fill="none" stroke="#faa5a9" strokeDasharray="3 4" opacity=".7"/>}</g>)}
      <text x="17" y="229" fill="#8bc5d0" fontSize="10" letterSpacing="2">TRAFFIC / SAMPLE DATA</text>
    </svg>
    <div className="nids-status"><span><i/> ANOMALY DETECTION MODEL</span><span>192.168.1.x</span></div>
  </div>
}


function MaintenanceVisual() {
  const monitor = [29, 35, 33, 52, 48, 64, 60, 72, 67, 81, 77, 91]
  return <div className="visual-screen visual-maintenance">
    <VisualTopline name="FLEET INTELLIGENCE / MACHINE HEALTH" icon={Wrench}/>
    <div className="maintenance-heading"><div><span className="maintenance-live"><i/> SIMULATION ACTIVE</span><strong>Predictive maintenance</strong><small>Fleet diagnosis & repair copilot</small></div><div className="maintenance-risk"><small>RISK LEVEL</small><strong>HIGH</strong></div></div>
    <div className="maintenance-body">
      <div className="maintenance-machine"><div className="machine-orbit orbit-one"/><div className="machine-orbit orbit-two"/><div className="machine-core"><Cpu size={56} strokeWidth={1.2}/><i/></div><div className="machine-caption"><span>MACHINE 04</span><strong>INDUCTION MOTOR</strong><small>Vibration pattern irregular</small></div></div>
      <div className="maintenance-diagnostics"><span>24H FAILURE RISK</span><div className="diagnostic-chart"><div className="diagnostic-bars">{monitor.map((v,i)=><i key={i} style={{height:v+'%',animationDelay:`${i*70}ms`}}/>)}</div></div><strong>EARLY WARNING <AlertTriangle size={14}/></strong><div className="diagnostic-line"><span>ROOT CAUSE</span><b>BEARING WEAR</b></div><div className="diagnostic-line"><span>WORK ORDER</span><b className="diagnostic-approved">AWAITING APPROVAL</b></div></div>
    </div>
    <div className="maintenance-footer"><span><CheckCircle2 size={13}/> HUMAN-IN-THE-LOOP REPAIR</span><span>ILLUSTRATIVE UI</span></div>
  </div>
}

function WarehouseVisual() {
  const bars = [43,70,58,84,61,92,74,55]
  return <div className="visual-screen visual-warehouse">
    <VisualTopline name="SUPPLYCHAIN OS / CONTROL CENTER" icon={Package}/>
    <div className="warehouse-heading"><div><small>WORKSPACE / OVERVIEW</small><strong>Inventory pulse<span>↗</span></strong></div><div className="warehouse-live"><i/> LIVE DEMO AVAILABLE</div></div>
    <div className="warehouse-kpis"><div><small>WAREHOUSES</small><strong>04</strong><span>Multi-location</span></div><div><small>STOCK HEALTH</small><strong>GOOD</strong><span>Inventory overview</span></div><div><small>SHIPMENTS</small><strong>↑ 24</strong><span>Example data</span></div></div>
    <div className="warehouse-data"><div className="warehouse-chart"><div className="warehouse-chart-heading"><strong>STOCK DISTRIBUTION</strong><span>MONTHLY VIEW</span></div><div className="warehouse-bars">{bars.map((value,i)=><span key={i}><i style={{height:value+'%'}}/><small>{['JA','FE','MR','AP','MY','JN','JL','AU'][i]}</small></span>)}</div></div><div className="warehouse-pipeline"><strong>ORDER FLOW</strong><div><span className="pipe-node"><Package size={18}/></span><i/><span className="pipe-node active"><Truck size={18}/></span><i/><span className="pipe-node"><CheckCircle2 size={18}/></span></div><small>ORDER → SHIPMENT → DELIVERED</small></div></div>
    <div className="warehouse-footer"><span><i/> SYNCHRONIZED INVENTORY</span><span>ILLUSTRATIVE UI</span></div>
  </div>
}
