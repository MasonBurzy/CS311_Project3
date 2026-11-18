import React, { useEffect, useState } from "react";
import TeamCard from "./TeamCard";
import "./Teams.css";

const API_URL = "https://statsapi.mlb.com/api/v1/teams?sportId=1";

const Teams = () => {
    const [teams, setTeams] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [foundTeams, setFoundTeams] = useState([]);
    const [message, setMessage] = useState("");

    const fetchTeams = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            console.log(data);

            if (data.teams) {
                setTeams(data.teams);
            }
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const searchTeam = async () => {
        const term = searchTerm.trim().toLowerCase();

        if (term === "") {
            setFoundTeams([]);
            setMessage("Please type a name to search for.");
            return;
        }

        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            const matches = data.results.filter((team) => {
                const fullName = `${team.name.first} ${team.name.last}`.toLowerCase();
                return fullName.includes(term);
            });

            setFoundTeams(matches);

            if (matches.length === 0) {
                setMessage(`No team found named "${searchTerm}".`);
            } else {
                setMessage("");
            }
        } catch (error) {
            console.log(`Error: ${error}`);
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="Teams">
            <h1>Teams</h1>

            {}
            <button onClick={fetchTeams}>Get Teams</button>

            {}
            <div className="search">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={searchTeam}>Search</button>
            </div>

            {}
            {message && <p className="message">{message}</p>}

            {foundTeams.length > 0 && (
                <div>
                    <h2>Search Result</h2>
                    <div className="user-list">
                        {foundTeams.map((user) => (
                            <TeamCard key={team.id} team={team} />
                        ))}
                    </div>
                </div>
            )}

            {}
            {teams.length > 0 && (
                <div>
                    <h2>All Teams ({teams.length})</h2>
                    <div className="team-list">
                        {teams.map((team) => (
                            <TeamCard key={team.id} team={team} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Teams;
