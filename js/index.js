
let sectArray = []
function sectDist(){
    for (let i=0; i<$('.section').length; i++) {
        sectArray[i] = $('.section').eq(i).offset().left
    }
}
sectDist()
console.log(sectArray)

$(window).on('resize', function(){
    sectDist()
})

let frameIndex = 0;
const totalFrames = 6; // 스프라이트 이미지의 총 프레임 수

$(window).on('scroll', function(){
    let sct = $(this).scrollLeft()
    // console.log(sct)

    if ( sct>=sectArray[0] && sct<sectArray[1] && !cflag) {
        $('#menu li').eq(0).addClass('on')
        $('#menu li').eq(0).siblings().removeClass('on')
        $('.skillContainer > div').removeClass('on')
        $('.autoClock').css({
            left:'300px',
            top:'100px'
        })
    } else if ( sct>=sectArray[1] && sct<sectArray[2] && !cflag) {
        $('#menu li').eq(1).addClass('on')
        $('#menu li').eq(1).siblings().removeClass('on')
        if ( !$('.skillContainer > div').hasClass('on') ) {
            $('.skillContainer > div').addClass('on')
            count(70, '.html', 10)
            count(60, '.css', 20)
            count(80, '.script', 30)
            count(60, '.jquery', 40)
            count(50, '.react', 50)
        }
        $('#sect3').removeClass('on')
        $('#sect3 ul li').css({ transitionDelay:'0s' })
        $('.autoClock').css({
            left:'50%',
            top:'100px',
        })
    } else if ( sct>=sectArray[2] && sct<sectArray[3] && !cflag) {
        $('#menu li').eq(2).addClass('on')
        $('#menu li').eq(2).siblings().removeClass('on')
        $('#sect4').removeClass('on')
        $('#sect3').addClass('on')
        for (let i=0; i<8; i++) {
            $('#sect3 ul li').eq(i).css({ transitionDelay:'0.'+i+'s' })    
        }
        $('#sect4 .formbox').css({
            transitionDelay:'0s'
        })
        $('.autoClock').css({
            left:'90%',
            top:'90%'
        })
    } else if ( sct>=sectArray[3] && !cflag) {
        $('#menu li').eq(3).addClass('on')
        $('#menu li').eq(3).siblings().removeClass('on')
        $('#sect4').addClass('on')
        $('.autoClock').css({
            left:'10%',
            top:'10%'
        })
    } 
})    

$('.section').on('wheel DOMMouseScroll', function(e){
    let delta = e.originalEvent.wheelDelta
    // delta>0 이면 마우스휠을 위로 굴린 것이고,
    // delta<0 이면 마우스휠을 아래로 굴린 것임
    console.log(delta)
    if (delta>0) {
        $('html, body').stop().animate({
            scrollLeft: $(this).prev().offset().left
        }, 500)
    } else {
        $('html, body').stop().animate({
            scrollLeft: $(this).next().offset().left
        }, 500)
    }
})

let cflag = false;
$('#menu li a').on('click focus', function(e){
   e.preventDefault()
   cflag = true;
   let num = $(this).parent().index()
   // console.log(num)
   $(this).parent().addClass('on').siblings().removeClass('on')

   if (num<1) {
        $('.skillContainer > div').removeClass('on')
    } else {
        if ( !$('.skillContainer > div').hasClass('on')) {
            $('.skillContainer > div').addClass('on')
            count(70, '.html', 10)
            count(60, '.css', 20)
            count(80, '.script', 30)
            count(60, '.jquery', 40)
            count(50, '.react', 50)
        }
    }

    if (num<2) {
        $('#sect3').removeClass('on')
        $('#sect3 ul li').css({
            transitionDelay:'0s'
        })
    } else {
        for (let i=0; i<8; i++) {
            $('#sect3 ul li').eq(i).css({ transitionDelay:'1.'+i+'s' })    
        }
        $('#sect3').addClass('on')
    }

   $('html, body').animate({
      scrollLeft: sectArray[num]
   }, 500, function(){ cflag = false })
})


function count(jumsu, cname, time) {
    let count = 0
    let stop = setInterval(function(){
        count++
        if (count<=jumsu) {
            $(cname).find('.myscore').text(count+'%')
        } else {
            clearInterval(stop)
        }
    }, time)
}

// 첫번째 섹션의 슬릭슬라이더
$('.slideInner').slick({
    autoplay:true,
    arrows:false,
    pauseOnHover:false,
    autoplaySpeed:3000,
    dots:true
})

$('.slideOuter .plpa').on('click', function(){
    if ( $(this).find('i').hasClass('fa-pause') ) {
        $('.slideInner').slick('slickPause')
        $(this).find('i').removeClass('fa-pause').addClass('fa-play')
    } else {
        $('.slideInner').slick('slickPlay')
        $(this).find('i').removeClass('fa-play').addClass('fa-pause')
    }
})


$('#sect3 .category a').on('click', function(e){
    e.preventDefault()
    let filterValue = $(this).attr('href')
    $('#sect3 .grid').isotope({
        filter:filterValue,
        layoutMode:'masonry',   // fitRows, masonry
        itemSelector:'.item'
    })
})

$('#sect3 .grid li a').on('click', function(){
    var href = $(this).attr('href')
    var title = $(this).attr('title')
    var src = $(this).find('img').attr('src')
    var alt = $(this).find('img').attr('alt')

    $('body').append(`<div class="outLayer"><div class="inLayer"><h2>${title}</h2><div><img src="${src}" alt="${alt}"><a href="${href}" target="_blank">사이트이동</a></div></div><button type="button">닫기</button></div>`)
    $('.outLayer').css({
        position:'fixed',
        top:0, left:0, right:0, bottom:0,
        background:'rgba(0,0,0,0.5)',
        zIndex:9999999999,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    })
    $('.inLayer').css({
        maxWidth:'600px',
        fontSize:'30px',
        textAlign:'center',
        color:'#fff'
    })
    $('.inLayer a').css({
        border:'2px solid #f00',
        display:'block',
        padding:'10px 20px',
        background:'blue',
        width:'200px',
        fontSize:'20px',
        margin:'10px auto'
    })
    $('.outLayer button').css({
        position:'absolute',
        top:'10px', right:'10px',
        fontSize:'30px',
        color:'#fff'
    })
    return false
})

$(document).on('click', '.outLayer button, .outLayer', function(){
    $('.outLayer').remove()
})

$(document).on('click', '.inLayer', function(e){
    e.stopPropagation()
})


