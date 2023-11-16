import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function MultiActionAreaCard({ title, description, imageUrl, id }) {
  return (
    <>

    
      <div style={{display:"flex", flexWrap:"wrap"}}>
          
            
                <div style={{padding:"0.7rem"}}>
                  <div className="card" style={{width:"15rem", height:"15rem"}}>
                    
                      <img
                        src={imageUrl}
                        width={"300rem"}
                        height={"300rem"}
                        alt="Diary Image"
                      />
                    
                    <div className="card-body">
                      <h5 className="card-title">{title}</h5>
                      <p className="card-text">{description}</p>
                    </div>
                  </div>
                </div>
            
        </div>
    
    </>
  );
}