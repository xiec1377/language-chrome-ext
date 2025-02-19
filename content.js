window.addEventListener('load', function () {
  const allElements = document.querySelectorAll('div, span, li, p')

  const elementsWithText = Array.from(allElements).filter(
    (element) => element.textContent.trim() !== '',
  )

  console.log('Elements with text:', elementsWithText)

  elementsWithText.forEach((element) => {
    console.log('Element:', element)
    let text = element.textContent.trim()
    if (text) {
      let words = element.innerText.split(' ')
      console.log('Words:', words)

      const originalClasses = Array.from(element.classList) 

      element.innerHTML = ''

      words.forEach((word) => {
        console.log('Word:', word)

        let span = document.createElement('span')
        span.innerText = word + ' '
        span.style.position = 'relative'
        span.style.cursor = 'pointer'

        span.classList.add(...originalClasses)

        span.addEventListener('mouseenter', async (e) => {
          const word = e.target.textContent.trim()
          const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${word}&langpair=en|es`,
          )
          const data = await response.json()
          showTooltip(e.target, data.responseData.translatedText)
        })

        span.addEventListener('mouseleave', () => {
            console.log("LEAVE")
          hideTooltip()
        })

        element.appendChild(span)
      })
    }
  })
})

function showTooltip(element, translation) {
  let tooltip = document.createElement('div')
  tooltip.innerText = translation
  tooltip.style.position = 'absolute'
  tooltip.style.background = '#000'
  tooltip.style.color = '#fff'
  tooltip.style.padding = '5px'
  tooltip.style.borderRadius = '5px'
  tooltip.style.zIndex = '1000'
  tooltip.style.cursor = 'pointer'

  let rect = element.getBoundingClientRect()
  let scrollY = window.scrollY
  let scrollX = window.scrollX

  tooltip.style.top = `${rect.top + scrollY - tooltip.offsetHeight - 10}px`
  tooltip.style.left = `${rect.left + scrollX}px`

  tooltip.setAttribute('id', 'tooltip')
  document.body.appendChild(tooltip)

  tooltip.addEventListener('click', () => {
    saveWord(translation)
    hideTooltip()
  })
}

function hideTooltip() {
  let tooltip = document.getElementById('tooltip')
  if (tooltip) {
    console.log('hide tooltip')
    tooltip.remove()
  }
}

function saveWord(word) {
  chrome.storage.sync.get({ savedWords: [] }, (data) => {
    let words = data.savedWords
    if (!words.includes(word)) {
      words.push(word)
      chrome.storage.sync.set({ savedWords: words })
    }
  })
}
