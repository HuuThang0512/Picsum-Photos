
const imgList = document.querySelector(".images")
const loadmoreBtn = document.querySelector(".load-more")
let page = 1
const limit = 8
const endPoint = `https://picsum.photos/v2/list?limit=${limit}`
const pageLoader = document.querySelector(".page-loader")

function imgTemplate(url) {
    const template = `<div class="image">
                        <img src="${url}" alt="">
                      </div>`
    imgList.insertAdjacentHTML("beforeend", template)
}

async function getImage(url, page = 1) {
    pageLoader.style.display = "block"
    loadmoreBtn.style.display = "none"
    const response = await fetch(`${url}&page=${page}`)
    const images = await response.json()
    if (images.length > 0 && Array.isArray(images)) {
        images.forEach(image => {
            imgTemplate(image.download_url)
        })
    }
    pageLoader.style.display = "none"
    loadmoreBtn.style.display = "block"
}

async function handleLoadmore() {
    // page++
    imgList.classList.add('is-loading')
    await getImage(endPoint, ++page)
    imgList.classList.remove('is-loading')
}

loadmoreBtn.addEventListener('click', handleLoadmore)

getImage(endPoint, 2)