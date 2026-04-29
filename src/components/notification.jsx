const Notification = ({info}) => {
    if(info.message === null){
        return null    
    }
    
    return (
        <div className={info.type}>
            {info.message}
        </div>
    )
}

export default Notification