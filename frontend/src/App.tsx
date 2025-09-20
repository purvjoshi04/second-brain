import './App.css'
import { Button } from './components/Button'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'

function App() {
  return (
    <div>
      <Button  startIcon={<ShareIcon size='sm' />} size="sm" variant='primary' text='Share'/>
      <Button startIcon={<PlusIcon size='lg'/>} size="lg" variant='secondary' text='Add content'/>
      <Button startIcon={<PlusIcon size='md'/>} size="md" variant='secondary' text='Add content'/>
    </div>
  )
}

export default App
