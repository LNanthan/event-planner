import './Home.css';
const GuestTile = ({name}) =>{

    return(
        // if the user clicks the guestTiles it won't unFocus the date selection
        <div className="guestTile" onClick={(e) => e.stopPropagation()}>
            <i class="fas fa-user"></i>
            <span className="gNameStyle">{name}</span>
        </div>
    )
}
const GuestInfo = ({gData, dateIndex, selDate}) => {
    let header = "";
    const data = JSON.parse(localStorage.getItem('data'));
    let index = (selDate-new Date(data[2]+"T00:00"))/86400000;
    let GTiles = [];
    let guests = [];
    if(selDate!=""){
        if(index>=0&&index<dateIndex.length){
            // console.log(dateIndex[index]);
            if(dateIndex[index].length!=0){
                guests = dateIndex[index].toString().split(",");
                guests.forEach((el,x) => {
                    GTiles.push(<GuestTile key ={x} name = {gData[parseInt(el)].guestName}/>)
                });
                header = "Available Particpants ("+guests.length+"/"+gData.length+")";
            }
            else{
                header = "Available Participants (0/3)"
            }
            
        }
    }
    else{
        header = "Particpants ("+gData.length+")";
        for(let i =0; i<gData.length; i++){
            GTiles.push(<GuestTile key ={i} name = {gData[i].guestName}/>);
        }
    }
   
    // if the date is within range of event
    
    // else{
    //     forEach(gData)
    // }
    
    
    console.log(GTiles);
    return(
        <div >
            <h2>{header}</h2>
            <div className = "gTile-cont">{GTiles}</div>
        </div>
    )
}

export default GuestInfo;