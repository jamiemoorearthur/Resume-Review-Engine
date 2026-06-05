function ScoreCards({ overallScore, atsScore, roleAlignment }) {
  return (
    <div className="score-breakdown">
      <div className="score-item">
        <div className="score-item-label">Overall Score</div>
        <div className="score-item-num">{overallScore}</div>
        <div className="score-item-bar"><div className="score-item-fill" style={{width:`${overallScore}%`}} /></div>
      </div>
      <div className="score-item">
        <div className="score-item-label">ATS Score</div>
        <div className="score-item-num" style={{color:'#5dcaa5'}}>{atsScore}</div>
        <div className="score-item-bar"><div className="score-item-fill" style={{width:`${atsScore}%`, background:'#5dcaa5'}} /></div>
      </div>
      <div className="score-item">
        <div className="score-item-label">Role Alignment</div>
        <div className="score-item-num" style={{fontSize:'22px', paddingTop:'6px'}}>{roleAlignment}</div>
        <div className="score-item-bar"><div className="score-item-fill" style={{width:'100%'}} /></div>
      </div>
    </div>
  )
}

export default ScoreCards