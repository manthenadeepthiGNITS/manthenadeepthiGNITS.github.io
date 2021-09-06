console.log("hi 1");
let c= document.getElementById("my_canvas");

let ctx= c.getContext("2d");
let loadImage=(src,callback)=>{
    let img = document.createElement("img");
    img.onload=() => callback(img);
    img.src=src;
	console.log("hi 2");
}
let imagePath=(frameNumber1,animation)=>{
	console.log(" imagePath frameNumber1----------->"+frameNumber1);
	console.log(" animation----------->"+animation);
    return "/images/"+animation+"/"+frameNumber1+".png";
};
let frames={
	idle:[1,2,3,4,5,6,7,8],
	kick:[1,2,3,4,5,6,7],
	punch:[1,2,3,4,5,6,7],
	block:[1,2,3,4,5,6,7,8,9],
	forward:[1,2,3,4,5,6],
	backward:[1,2,3,4,5,6]
};

let loadImages=(callback)=>{
	console.log(" in loadImages----------->");
    let images={idle:[],kick:[],punch:[],block:[],forward:[],backward:[]};
    let imagesToLoad=0;
		console.log(" in loadImages 2----------->"+images);
    ["idle","kick","punch","block","forward","backward"].forEach((animation)=>
    {
		let animationFrames=frames[animation];
		console.log("----------->"+animationFrames.type);
		imagesToLoad=imagesToLoad+animationFrames.length;
		
		animationFrames.forEach((framenumber)=>
		{
		
		//let temp = framenumber;
		//console.log("temp----------->"+temp);	
		console.log("framenumber----------->"+framenumber);	
		//let path=imagePath(temp,animation);
		let path=imagePath(framenumber,animation);
		
        loadImage(path,(image)=>{
            images[animation][framenumber-1]=image;
            imagesToLoad=imagesToLoad-1;
            if(imagesToLoad===0)
            {
                callback(images);
            }
        });
        
    });
});
};
let animate=(ctx,images,animation,callback)=>
{
    images[animation].forEach((image,index)=>
    {
        setTimeout(() => {        
            ctx.clearRect(0,0,500,500);
            ctx.drawImage(image,0,0,500,500);
        },index*100);
      
    });
	  setTimeout(callback,images[animation].length*100);
};
loadImages((images)=>{
	let queuedAnimation=[];
	let aux=()=>{
		let selectedAnimation;
		if(queuedAnimation.length===0)
		{
			selectedAnimation="idle";
		}
		else{
			selectedAnimation=queuedAnimation.shift();
		}
	   animate(ctx,images,selectedAnimation,aux);
    };
	aux();
	document.getElementById("kick").onclick=()=>
	{
		queuedAnimation.push("kick");
	};
	document.getElementById("punch").onclick=()=>
	{
		queuedAnimation.push("punch");
	};
	document.getElementById("block").onclick=()=>
	{
		queuedAnimation.push("block");
	};
	
	document.getElementById("backward").onclick=()=>
	{
		queuedAnimation.push("backward");
	};
});
//loadImage("images/idle.png",(img)=>{ctx.drawImage(img,0 ,0, 500, 500);});


