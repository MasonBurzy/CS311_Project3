import React from "react";

const TeamCard = ({ team }) => {
    return (
        <div className="team-card">
            <img 
                src={`https://www.mlbstatic.com/team-logos/${team.id}.svg`}
            />

            <h3>{team.name}</h3>

            <p>{team.locationName}</p>

            <p>{team.venue.name}</p>
        </div>
    );
};

export default TeamCard;