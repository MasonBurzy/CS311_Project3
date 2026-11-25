import React, { useEffect, useState } from "react";
import TeamCard from "./TeamCard";
import "./Teams.css";

const API_URL = "https://statsapi.mlb.com/api/v1/teams?sportId=1";

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [foundTeams, setFoundTeams] = useState([]);
    const [message, setMessage] = useState("");
    const [filter, setFilter] = useState("All")
    const [activeFilter, setActiveFilter] = useState("All");

    const fetchTeams = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            console.log(data);
            console.log([...new Set(data.teams.map((team) => team.league.name))]);

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

    const filteredTeams = teams.filter((team) => {
        if (filter === "All") return true;
        return team.league.name === filter;
    }) 

    const searchTeam = async () => {
        const term = searchTerm.trim().toLowerCase();

        if (term === "") {
            setFoundTeams([]);
            setMessage("Please type a name to search for.");
            return;
        }

        const matches = filteredTeams.filter((team) =>
        team.name.toLowerCase().includes(term)
        );

        setFoundTeams(matches);

        if (matches.length === 0) {
            setMessage(`No team found named "${searchTerm}".`);
        } else {
            setMessage("");
        }
    };

    return (
        <div className="Teams">
            <h1>Teams</h1>

            {/* Division drop-down menu & functionality */}
            <select className="division-menu"
                name="league"
                id="league-select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                >
                <option value="All">All Divisions</option>
                <option value="American League">American League</option>
                <option value="National League">National League</option>
            </select>

            {/* "Search" button */}
            <form className="search" onSubmit={(e) => {
                e.preventDefault();

            }}>
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={searchTeam}>Search</button>
            </form>

            {message && <p className="message">{message}</p>}

            {foundTeams.length > 0 && (
                <div>
                    <h2>Search Result</h2>
                    <div className="container">
                        {foundTeams.map((team) => (
                            <TeamCard key={team.id} team={team} />
                        ))}
                    </div>
                </div>
            )}

            {teams.length > 0 && (
                <div>
                    <h2>All Teams ({teams.length})</h2>
                    <div className="container">
                        {filteredTeams.map((team) => (
                            <TeamCard key={team.id} team={team} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Teams;
