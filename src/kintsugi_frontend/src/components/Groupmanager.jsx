// src/components/GroupManager.jsx
import React, { useState } from 'react';
import '../styles/groupmanager.css'; 

const GroupManager = ({ createGroup, joinGroup, submitProposal, proposals, voteOnProposal }) => {
    const [groupId, setGroupId] = useState('');
    const [newProposal, setNewProposal] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleCreateGroup = () => {
        if (groupId.trim()) {
            createGroup(groupId);
            setGroupId('');
            setFeedback('Group created successfully!');
        } else {
            setFeedback('Please enter a valid Group ID.');
        }
    };

    const handleJoinGroup = () => {
        if (groupId.trim()) {
            joinGroup(groupId);
            setGroupId('');
            setFeedback('Joined group successfully!');
        } else {
            setFeedback('Please enter a valid Group ID.');
        }
    };

    const handleSubmitProposal = () => {
        if (newProposal.trim()) {
            submitProposal(newProposal);
            setNewProposal('');
            setFeedback('Proposal submitted successfully!');
        } else {
            setFeedback('Please enter a valid proposal.');
        }
    };

    return (
        <div className="group-manager">
            <h2>Manage Your Support Groups</h2>
            <div className="input-group">
                <input 
                    type="text" 
                    placeholder="Enter Group ID" 
                    value={groupId}
                    onChange={(e) => setGroupId(e.target.value)}
                />
                <div className="button-group">
                    <button className="create-button" onClick={handleCreateGroup}>Create Group</button>
                    <button className="join-button" onClick={handleJoinGroup}>Join Group</button>
                </div>
            </div>
            {feedback && <p className="feedback">{feedback}</p>}
            
            <div className="proposal-section">
                <h3>Voice Your Concerns</h3>
                <textarea 
                    placeholder="Enter your proposal..." 
                    value={newProposal}
                    onChange={(e) => setNewProposal(e.target.value)}
                />
                <button className="submit-proposal" onClick={handleSubmitProposal}>Submit Proposal</button>
            </div>

            <div className="proposals-list">
                <h3>Shared Voices</h3>
                
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
) : (
    <p>No proposals available.</p>
)}


            </div>
        </div>
    );
};

export default GroupManager;
