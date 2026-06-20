function SectionRecommendations({ recommendations }) {
   if (!recommendations || recommendations.length === 0) return null
 
   return (
     <div className="result-card">
       <div className="result-card-header">
         <div className="result-card-icon">🗂️</div>
         <span className="result-card-title">Section recommendations</span>
       </div>
       <div className="result-card-body">
         {recommendations.map((r, i) => (
           <div className="sw-item" key={i}>
             <span className="sw-tick" style={{ color: '#3b82f6' }}>→</span>
             <span>{r}</span>
           </div>
         ))}
       </div>
     </div>
   )
 }
 
 export default SectionRecommendations