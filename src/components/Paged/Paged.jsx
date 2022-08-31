import React from "react";
import './paged.css';
 
export default function Paged({experiencesPage, allExperiences, paged, currentPage}) { 
    
    const pages = []; 
        
    for (let i = 1; i <= Math.ceil(allExperiences/experiencesPage); i++) { 
        pages.push(i)
    };         
    return(
        
        <div>
            
            {pages.length <= 1 ? 
            <></> :
            <nav className="pagination">
                
                <ul className="pages">
                    {pages?.map(p =>(
                        <li className="page" key={p}>
                            {p === currentPage ? 
                            (<button className="pageBtn" onClick={() => paged(p)} style={{width:"30px", backgroundColor:"#C49D48"}}>{p}</button>) : 
                            (<button className="pageBtn" onClick={() => paged(p)} style={{width:"30px"}}>{p}</button>)}   
                        </li> 
                    ))}
                </ul>
    
            </nav>
            }  

        </div>
    )
};
