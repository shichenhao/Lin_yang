let level = value => {
    let text ='' ;
    if(value === 1){
        text = '初级'
    }else if(value === 2){
        text = '中级'
    }else if(value === 3){
        text = '高级'
    }
    return text
}
export { level }
