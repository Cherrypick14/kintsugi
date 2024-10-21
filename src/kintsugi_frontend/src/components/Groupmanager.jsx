import React, { useState, useEffect } from 'react';
import { kintsugi_backend } from 'declarations/kintsugi_backend'; // Import backend
import '../styles/groupmanager.css'; 
import Header from '../components/Header';
import Footer from '../components/Footer';

const GroupManager = () => {
    const [groupId, setGroupId] = useState('');
    const [newProposal, setNewProposal] = useState('');
    const [feedback, setFeedback] = useState('');
    const [groups, setGroups] = useState([]); // Store the list of support groups
    const [proposals, setProposals] = useState([]); // Store the list of proposals

    // Fetch available groups from the backend
    useEffect(() => {
        const fetchGroups = async () => {
            const fetchedGroups = await kintsugi_backend.getGroups(); // Assuming getGroups is a backend function
            setGroups(fetchedGroups);
        };
        fetchGroups();
    }, []);

    const handleCreateGroup = async () => {
        if (groupId.trim()) {
            await kintsugi_backend.createGroup(groupId); // Create group using backend canister
            setGroupId('');
            setFeedback('Group created successfully!');
            refreshGroups(); // Optionally refresh the group list here
        } else {
            setFeedback('Please enter a valid Group ID.');
        }
    };

    const handleJoinGroup = async (group) => {
        await kintsugi_backend.joinGroup(group); // Join group using backend canister
        setFeedback(`Joined group: ${group}`);
    };

    const handleSubmitProposal = async () => {
        if (newProposal.trim()) {
            await kintsugi_backend.submitProposal(newProposal); // Submit proposal via backend canister
            setNewProposal('');
            setFeedback('Proposal submitted successfully!');
            refreshProposals(); // Refresh the proposals list
        } else {
            setFeedback('Please enter a valid proposal.');
        }
    };

    const voteOnProposal = async (proposalId, isUpvote) => {
        await kintsugi_backend.voteOnProposal(proposalId, isUpvote); // Voting on proposals using backend canister
        refreshProposals(); // Refresh the proposals list after voting
    };

    // Function to refresh groups
    const refreshGroups = async () => {
        const updatedGroups = await kintsugi_backend.getGroups();
        setGroups(updatedGroups);
    };

    // Function to refresh proposals
    const refreshProposals = async () => {
        const fetchedProposals = await kintsugi_backend.getProposals(); // Assuming getProposals is a backend function
        setProposals(fetchedProposals);
    };

    return (
        <>
        <Header />
           <div className="group-manager">
            <h2>Join a Support Group</h2>
            <input 
                type="text" 
                placeholder="Enter Group ID" 
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
            />
            <div className="button-group">
                <button className="create-button" onClick={handleCreateGroup}>Create Group</button>
                <button className="join-button" onClick={() => handleJoinGroup(groupId)}>Join Group</button>
            </div>
            {feedback && <p className="feedback">{feedback}</p>}

            <div className="groups-list">
                <h3>Available Support Groups</h3>
                {groups.length > 0 ? (
                    groups.map((group, index) => (
                        <div key={index} className="group-card">
                            <h4>{group.name}</h4>
                            <p>{group.description}</p>
                            <button onClick={() => handleJoinGroup(group.id)}>Join</button>
                        </div>
                    ))
                ) : (
                    <p>No support groups available.</p>
                )}
            </div>

            <div className="proposal-section">
                <h3>Community Governance</h3>
                <textarea 
                    placeholder="Enter your proposal..." 
                    value={newProposal}
                    onChange={(e) => setNewProposal(e.target.value)}
                />
                <button className="submit-proposal" onClick={handleSubmitProposal}>Submit Proposal</button>
            </div>

            <div className="proposals-list">
                <h3>Current Proposals</h3>
                {proposals && proposals.length > 0 ? (
                 proposals.map((proposal, index) => (
                    <div key={index} className="proposal">
                        <p>{proposal.text}</p>
                        <div className="vote-buttons">
                            <button className="vote-button" onClick={() => voteOnProposal(proposal.id, true)}>Upvote</button>
                            <button className="vote-button" onClick={() => voteOnProposal(proposal.id, false)}>Downvote</button>
                            <span>{proposal.votes} votes</span>
                        </div>
                    </div>
                ))
                ):(
                    <p>No proposals available.</p>
                )}
                
            </div>
        </div>
        <Footer />
        </>
    );
};

export default GroupManager;
