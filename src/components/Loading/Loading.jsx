import styled from './Loading.module.css'

const Loading = () => {
  return <div className='w-full pt-5'>
 <div className={styled.loader_container}>
  <div className={styled.loader}></div>
  <div className={styled.loader_text}>Loading...</div>
</div> 
  </div>


}

export default Loading
