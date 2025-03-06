function draw(){
	tileIndex=indexInput.value()
	
	background(0)
	textSize(12)
	textFont(font2)
	tileCanvas.background(100)
	tileCanvas.noStroke()
	tileCanvas.textSize(100)
	
	tileW=tileCanvas.width
	tileH=tileCanvas.height
	power10=0
	illion=undefined
	fullNumber=true
	
	tileIndexBase=floor(max(0,min(tileIndex,tiles.length-1)))
	if(tiles[tileIndexBase].text=="2^x"||tileIndexBase!=tileIndex){
		huge=(tileIndex>=1024)
		if(huge){
			tileText=new Decimal(2).pow(tileIndex)
		}else{
			if((tileIndex<=powers.length&&tileIndex>0)&&tileIndex==round(tileIndex)){
				tileText=powers[round(tileIndex)-1]
			}else{
				tileText=2**tileIndex
			}
		}
		if(tileText!="Infinity"){
			if(tileIndex>=0){
				power10=floor(Decimal.log10(tileText))
				illion=max(0,floor(power10/3)-1)
			}else{
				power10=floor(Decimal.log10(tileText))
				illion=floor(power10)
			}
		}
	}else if(tiles[tileIndexBase].text==undefined){
		tileText=tileIndex
	}else{
		tileText=tiles[tileIndexBase].text
	}
	if(illion==undefined){illion=0}
	
	if(tileText=="Infinity"){
		tileIndexBase=0
		textColor=tileI.textColor
		tileShape=tileI.shape
		colors   =tileI.colors
	}else if(tileText=="0"){
		tileIndexBase=0
		textColor=tile0.textColor
		tileShape=tile0.shape
		colors   =tile0.colors
	}else if(tileIndex<0){
		tileIndexBase=max(0,min(abs(tileIndex),tilesF.length-1))
		textColor=tilesF[tileIndexBase].textColor
		tileShape=tilesF[tileIndexBase].shape
		colors   =tilesF[tileIndexBase].colors
	}else{
		textColor=tiles[tileIndexBase].textColor
		tileShape=tiles[tileIndexBase].shape
		colors   =tiles[tileIndexBase].colors
	}
	
	tileCanvas.background(colors[0])
	tileCanvas.textAlign(CENTER,CENTER)
	shapeDraw(tileShape)
	tileCanvas.fill(textColor)
	tileCanvas.textFont(font2)
	tText=((power10>=shortenThreshold||power10<0)&&abs(illion)!=Infinity)?shortenNumber(tileText,illion,fractionDecimals,fractionScientific):tileText
	if(commaSeparate){tText=nfc(str(tText))}
	tWidth=textWidth(tText)
	tSize=fullNumber?maxTextSize:maxShortenTextSize;tSize=min(tSize,textShrink/tWidth)
	tileCanvas.textSize(tSize)
	tileCanvas.text(tText,tileW/2,(tileH/2)-((tSize/512)*(textOffsetY*100)))
	
	if(tText==0){power10=-Infinity}
	if(tText==Infinity){power10=Infinity}
	
	fill(255)
	textFont(defaultFont)
	textAlign(CENTER,CENTER)
	textSize(96)
	text("2048 insane tile generator",width/2,height*0.1125)
	textSize(48)
	text("Level",width/4,height*0.425)
	text("tile",width/4,height*0.575)
	textSize(72)
	text(tileIndex,width/4,height*0.5)
	textSize(36)
	if(power10!=undefined){text("10^"+power10,width/4,height*0.675)}
	if(power10!=undefined||illion!=undefined){text("-illion "+max(0,illion),width/4,height*0.725)}
	textSize(48)
	textAlign(CENTER,CENTER)
	text("Shape",width/4*3,height*0.425)
	textSize(72)
	text(tileShape,width/4*3,height*0.5)
	
	image(tileCanvas,width/2-tileSize/2,height/2-tileSize/2,tileSize,tileSize)
	tileSaveCanvas.image(tileCanvas,0,0,tileSize,tileSize)
}

function shortenNumber(num,il,fd,sn){
	this.num=num
	this.il=il
	this.fd=fd
	this.sn=sn
	this.a=0
	if(this.il<0){
		if(abs(this.il)>=this.sn){
			fullNumber=false
			this.a=Decimal.div(Decimal.floor(new Decimal(this.num).div(new Decimal(10).pow(new Decimal(this.il))).mul(Decimal.pow(10,fractionScientificDecimals))),Decimal.pow(10,fractionScientificDecimals))
			this.a=this.a+"x10^"+this.il
		}else{
			if(this.fd>33){
				this.a=this.num
			}else{
				//this.a=Decimal.div(Decimal.floor(new Decimal(this.num).mul((new Decimal(10).pow(new Decimal(fractionDecimals))))),Decimal.pow(10,fractionDecimals))
				this.a=(floor(this.num*(10**fractionDecimals)))/(10**fractionDecimals)
			}
		}
	}else{
		fullNumber=false
		this.a=Decimal.div(Decimal.floor(new Decimal(this.num).div(new Decimal(10).pow(new Decimal(this.il).add(1).mul(3))).mul(Decimal.pow(10,shortenDecimals))),Decimal.pow(10,shortenDecimals))
		this.a=this.a+shortenSeparator+prefix(this.il,this.il<shortS0.length,this.il<100)
	}
	return this.a
}

function prefix(n,s0,s1){
	this.n=n
	this.s0=s0
	this.s1=s1
	this.a=""
	this.b=""
	this.hugeS=floor(Math.log10(max(0.5,this.n)/1000)/3)+1
	this.out=""
	for(i=this.hugeS;i>0;i--){
		this.a=""
		this.b=""
		if(i>=this.hugeS||(this.n%(1000**(i+1))>=1000**i)){
			this.a=prefixA(floor(this.n/(1000**i)),false,false)
			if(this.a=="U"){this.a=""}
			this.b=short[30+i]
		}
		this.out=this.out+this.a+this.b
		//this.out=this.out+str(this.d)
	}
	//this.out=this.out
	return this.out+prefixA(this.n,this.s0,this.s1)
}

function prefixA(n,s0,s1){
	this.nA=n%1000
	this.s0A=s0
	this.s1A=s1
	this.outA=""
	if(this.nA>=0){
		for(j=0;j<floor(Math.log10(max(1,this.nA)))+1;j++){
			if(this.s0A&&j==0){
				this.outA=this.outA+shortS0[this.nA%shortS0.length]
			}else{
				if(this.s1A&&j==1&&shortS1.length>floor(this.nA/10)%10){
					this.outA=this.outA+shortS1[(floor(this.nA/10)%10)%shortS1.length]
				}else{
					this.outA=this.outA+short[(floor(this.nA/(10**j))%10)+j*10]
				}
			}
		}
	}
	return this.outA
}

function keyPressed(){
	if(keyCode==13){draw()}
}

function saveTile(){
	imgName="tile"
	if(tileIndex!=""){
		imgName=imgName+"_"+((tText=="0")?"-infinity":(tText=="Infinity")?"infinity":tileIndex*1)
	}
	saveCanvas(tileSaveCanvas,imgName,"png")
}

function generateSave(){
	draw()
	saveTile()
}

function copyText() { // Code by EliK
    var dummy=document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value=tText;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}