import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { featureId } = req.body;

        const filePath = path.join(process.cwd(), 'votes.json');

        let votes = [];
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            votes = JSON.parse(data);
        }

        const updatedVotes = votes.map(vote => {
            if (vote.id === featureId) {
                return { ...vote, votes: vote.votes + 1 };
            }
            return vote;
        });

        if (!updatedVotes.find(vote => vote.id === featureId)) {
            updatedVotes.push({ id: featureId, name: `Feature ${featureId}`, votes: 1 });
        }

        fs.writeFileSync(filePath, JSON.stringify(updatedVotes, null, 2), 'utf8');

        res.status(200).json(updatedVotes);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
