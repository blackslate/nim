var showWinner

;(function() {
  var active
  var rowCount
  var winner
  var winnerDiv = document.querySelector("#winner")

  // Code that runs when the page is first loaded
  ;(function initialize () {
    document.body.onclick = hideMatch
    document.querySelector(".start").onclick = startNewGame
    initializeTurns()

    startNewGame({target: {className: "twoPlayers"}})
  })()

  function initializeTurns() {
    var turnButtons = document.querySelectorAll(".turns button")
    var button

    for (var ii=0; ii<turnButtons.length; ii++) {
      button = turnButtons[ii]
      button.onclick = nextTurn
    }
  }

  // Code to start a new game
  function startNewGame(event) { 
    player1 = "Player 1"
    player2 = "Player 2"
    setPlayerNames()
  
    reset()
  }

  function setPlayerNames() {
    var players = document.querySelectorAll(".turns div")
    var match, player, nameField

    for (var ii=0; ii<players.length; ii++) {
      player = players[ii]
      nameField = player.querySelector("p")

      if (ii === 0) {       
        active = player
        active.classList.add("active")
        active.classList.remove("enabled")
        nameField.textContent = player1

      } else {
        player.classList.remove("active")
        nameField.textContent = player2
      }
    }
  }

  function reset() {
    var matches = document.querySelectorAll(".matches img.removed")

    for (var ii=0; ii<matches.length; ii++) {
      var match = matches[ii]
      match.classList.remove("removed")
    }

    winnerDiv.classList.add("hidden")

    rowCount = 0
  }

  // Code that runs each time a match is removed
  function hideMatch(event) {
    var match = event.target
    
    if (match.nodeName !== "IMG") {
      return
    } else if (match.className === "removed") {
      return
    } else if (rowsDontMatch(match)) {
      return
    }
    
    match.classList.add("removed")
    active.classList.add("enabled")

    checkForWinner()
  }

  function rowsDontMatch(match) {
    var matchCount = match.parentElement.childElementCount
    if (rowCount) {
      if (rowCount !== matchCount) {
        return true
      }
    } else {
      rowCount = matchCount
    }

    return false
  }

  function checkForWinner() {
    var selector = ".matches img.removed"
    var removed = document.querySelectorAll(selector).length

    if (removed === 16) {
      if (winner === "You") {
        showWinner(winner+" win!")
      } else {
        showWinner(winner+" wins!")
      }
    }
  }

  showWinner = function showWinner(winner) {
    var p = winnerDiv.querySelector("p")
    p.textContent = winner
    winnerDiv.classList.remove("hidden")
  }

  // Code that runs when the Done button is clicked
  function nextTurn() {
    if (!active.classList.contains("enabled")) {
      return
    }

    winner = active.querySelector("p").textContent

    var next = document.querySelector(".turns div:not(.active)")
    active.classList.remove("active")
    active.classList.remove("enabled")

    active = next
    active.classList.add("active")

    rowCount = 0 
  }
})()