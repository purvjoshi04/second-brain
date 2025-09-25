import { useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Sidebar } from '../components/Sidebar'
import { useContents } from '../hooks/useContent'
import axios from 'axios'
import { BACKEND_URL, VITE_BRAIN_SHARE_URL } from '../config'

export const Dashboard = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const { contents, refetch } = useContents();

    const shareBrain = async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
            share: true
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }) ;
        const shareUrl = `${VITE_BRAIN_SHARE_URL}/${response.data.hash}`
        await navigator.clipboard.writeText(shareUrl);
    }

    return (
        <div>
            <Sidebar />
            <div className='p-4 ml-72 min-h-screen bg-[#eeeeef]'>
                <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} onContentAdded={refetch} />
                <div className='flex justify-end gap-4 mb-6'>
                    <Button startIcon={<ShareIcon />} variant='secondary' text='Share Brain' onClick={shareBrain} />
                    <Button startIcon={<PlusIcon />} variant='primary' text='Add content' onClick={() => setModalOpen(true)} />
                </div>
                <div className='flex gap-4 flex-wrap'>
                    <Card
                        id="test_1"
                        title="Project Ideas"
                        type="X"
                        link="https://twitter.com/kirat_tw/status/1875218603966136424"
                    />
                    <Card
                        id="test_2"
                        title="Tutorial Video"
                        type="youtube"
                        link="https://www.youtube.com/watch?v=Lv8BD8xefJs"
                    />
                    {contents.map((content) => (
                        <Card
                            key={content._id}
                            id={content._id}
                            title={content.title}
                            type={content.type}
                            link={content.link}
                            onDelete={refetch}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}