import { useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Sidebar } from '../components/Sidebar'

export const Dashboard = () => {
    const [modelOpen, setModalOpen] = useState(false);
    return (
        <div>
            <Sidebar />
            <div className='p-4 ml-72 min-h-screen bg-[#eeeeef]'>
                <CreateContentModal open={modelOpen} onClose={() => setModalOpen(false)} />
                <div className='flex justify-end gap-4 mb-6'>
                    <Button startIcon={<ShareIcon />} variant='secondary' text='Share Brain' onClick={() => console.log('Share clicked')} />
                    <Button startIcon={<PlusIcon />} variant='primary' text='Add content' onClick={() => setModalOpen(true)} />
                </div>
                <div className='flex gap-4 flex-wrap'>
                    <Card
                        title="Project Ideas"
                        type="twitter"
                        link="https://twitter.com/kirat_tw/status/1875218603966136424"
                    />
                    <Card
                        title="Tutorial Video"
                        type="youtube"
                        link="https://www.youtube.com/watch?v=Lv8BD8xefJs"
                    />
                </div>
            </div>
        </div>
    )
}