
const main = document.querySelector('main');
let headhead;
const mainPageHeading = document.createElement("h1");
mainPageHeading.className = "main-page-heading flex";
mainPageHeading.innerHTML = "STUDIO GHIBLI"
main.appendChild(mainPageHeading);

const dotMain = document.createElement('div');
dotMain.className = "main";

const mainContainer = document.createElement('div');
mainContainer.className = "main-container";

dotMain.appendChild(mainContainer);
main.appendChild(dotMain);

//API Call For Data
const ghibliDataMain = async () =>{

    const data = await fetch(`https://ghibliapi.vercel.app/films`);
    const information = await data.json();
    return [information]
}

//scroll to top
// window.scrollTo(0, 0);
//First page execution

firstPage();

// Movies page execution

function firstPage(){
    // creation of the main container
    const ghibliData = async() => {
        const info = await ghibliDataMain();
        const information = info[0];
        document.querySelector(".loading").style.display = "none";
        //starting of the interation
        for(let i=0 ; i<=information.length; i++){
        
            
        const mainChildren = document.createElement('div');
        mainChildren.className = `main-children main-${i} ${i}`;
    
        const mainImage = document.createElement('img');
            mainImage.className = 'main-image';
            mainImage.src = `${information[i].movie_banner}`;
            mainImage.alt = `movie_banner : ${information[i].title}`;
    
        const title = document.createElement('div');
            title.className = 'title';
            title.innerHTML =`${information[i].title}`
    
        const director = document.createElement('div');
            director.className = 'director';
            director.innerHTML = `<p>Director: </p> ${information[i].director}`
    
        const producer = document.createElement('div');
            producer.className = 'producer';
            producer.innerHTML =`<p>producer: </p> ${information[i].producer}`
    
        // appending to main container 
        mainChildren.append(mainImage,title,director,producer);
    
        // appending to page 
        mainContainer.appendChild(mainChildren);
    }}
    ghibliData();
    }

const theInterval = setInterval(()=>{moviesPage();}, 300 );
function moviesPage(){
    const mainChildren = document.querySelectorAll(".main-children");
    
    if(mainChildren.length !== 0){
        clearInterval(theInterval);
    }
    
    // const mm = document.querySelector(".mm")
    // console.log(mm)

    mainChildren.forEach((child)=>{
        child.addEventListener('click',(e)=>{
            //clearInterval
            document.querySelector(".loading").style.display = "flex";
            main.innerHTML = "";
            setTimeout(()=>{
            main.innerHTML = "";
            window.scrollTo(0, 0);
            const imp = e.target.classList[2];
            const ghibliMovies = async() => {
                const moviesObj = await ghibliDataMain();
                const movies = moviesObj[0];
                const movie = movies[imp];
                //header 
                document.querySelector(".loading").style.display = "none";
                const head = document.createElement('div');
                head.className = "head";
                head.addEventListener('click',()=>{
                    document.querySelector(".loading").style.display = "flex";
                    location.reload();
                })
                
                const mainMovie = document.createElement("div");
                mainMovie.className = "main-movie";
                mainMovie.style.backgroundImage = `url(${movie.movie_banner})`;
        
                const mainMovieTitle = document.createElement("h1");
                mainMovieTitle.className = "main-movie-title flex";
                mainMovieTitle.innerHTML = `${movie.title}`;
        
                head.append(mainMovie,mainMovieTitle)
                
                //content
                const orignalTitle = document.createElement("div");
                orignalTitle.className = "orignal-title flex";
                orignalTitle.innerHTML = `<p>Orignal title</p>${movie.original_title}`;
        
                const orignalTitleRom = document.createElement("div");
                orignalTitleRom.className = "orignal-title-romanised flex";
                orignalTitleRom.innerHTML = `<p>Title romanised</p>${movie.original_title_romanised}`;
        
                const description = document.createElement("div");
                description.className = "description";
                description.innerHTML = `${movie.description}`;
        
                //the lower box 
        
                const threeFlex = document.createElement("div");
                threeFlex.className = "three-flex flex";
        
                const director = document.createElement("div");
                director.className = "mdirector f flex";
                director.innerHTML = `<p>Director</p>${movie.director}`;
        
                const releaseDate = document.createElement("div");
                releaseDate.className = "mrelease-date f flex";
                releaseDate.innerHTML = `<p>Release date</p>${movie.release_date}`;
        
                const producer = document.createElement("div");
                producer.className = "mproducer f flex";
                producer.innerHTML = `<p>Producer</p>${movie.producer}`;
        
                threeFlex.append(director,releaseDate,producer);
        
                main.append(head,orignalTitle,orignalTitleRom,description,threeFlex);
                //elements of the movie page 
            };ghibliMovies();
        

            },600)
            
        })
    })

};
