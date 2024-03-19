import { useState } from 'react';

export default function Home() {
    const [features, setFeatures] = useState([
        { id: 1, name: 'Feature 1', votes: 0 },
        { id: 2, name: 'Feature 2', votes: 0 },
        { id: 3, name: 'Feature 3', votes: 0 },
    ]);

    const voteForFeature = async (featureId) => {
        const res = await fetch('/api/vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ featureId }),
        });

        if (res.ok) {
            const updatedFeatures = await res.json();
            setFeatures(updatedFeatures);
        }
    };

    return (
        <div>
            <h1>Vote for the Next Feature</h1>
            <ul>
                {features.map((feature) => (
                    <li key={feature.id}>
                        {feature.name} - Votes: {feature.votes}
                        <button onClick={() => voteForFeature(feature.id)}>Vote</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
