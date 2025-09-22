import { Button } from './components/Button'
import { Card } from './components/Card'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'

function App() {
  return (
    <div>
      <Button  startIcon={<ShareIcon size='md' />} size="md" variant='primary' text='Share Brain'/>
      <Button startIcon={<PlusIcon size='md'/>} size="md" variant='secondary' text='Add content'/>
      <Card title={"Projects Ideas"} type={"twitter"} link={'<blockquote class="twitter-tweet"><a href="https://twitter.com/kirat_tw/status/1875218603966136424?ref_src=twsrc%5Etfw"></a></blockquote>'}/>
      <Card title={"Projects Ideas"} type={"twitter"} link={'<iframe width="560" height="315" src="https://www.youtube.com/embed/Lv8BD8xefJs?si=ERFkAR0FCSaJk-Ed" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'}/>
    </div>
  )
}

export default App
