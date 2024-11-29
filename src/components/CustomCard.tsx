// src/components/CustomCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import pokebola from '../assets/img/pokebola.webp';
import '../Styles/myStyles.css';

interface CustomCardProps {
  number: number;
  name: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ number, name }) => {
  return (
    <div className="card neon-card" style={{ width: '12rem', position: 'relative', textAlign: 'center' }}>
      <img
        src={pokebola}
        className="card-img-top neon-img"
        alt="Card image"
        style={{
          position: 'absolute',
          top: '-50px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          borderRadius: '0.25rem 0.25rem 0 0',
        }}
      />
      <div className="card-body" style={{ paddingTop: '80px' }}>
        <Link to={`/details/${name}/${number}`} style={{ textDecoration: 'none' }}>
          <button type="button" className="btn btn-success">
            <strong>#{number.toString().padStart(3, '0')}</strong> {name}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CustomCard;
