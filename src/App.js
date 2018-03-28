import React, { Component }   from 'react';
import './App.css';
import './skeleton.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      strings: [
        {
        'riddle': 'Qu\'est-ce qui est jaune et qui attend ?',
        'answer': 'jonathan'
        },
        {
        'riddle': 'Je peux tourner sans bouger. Qui suis-je ?',
        'answer': 'lait'
        },
        {
        'riddle': 'J\'ai deux jambes et ne marche pas. Qui suis-je ?',
        'answer': 'pantalon'
        },
        {
        'riddle': 'Je réfléchis sans réfléchir. Qui suis-je ?',
        'answer': 'miroir'
        },
        {
        'riddle': 'Je commence par un e, je termine par un e, pourtant je ne contiens qu\'une lettre, et je ne suis pas la lettre e. Qui suis-je ?',
        'answer': 'enveloppe'
        },
        {
        'riddle': 'Tous les voleurs me possèdent. Je viens en premier dans les vengeances. Tous les devins m\'utilisent. Les savants ne peuvent se passer de moi. Car je suis le centre de gravité. Qui suis-je ?',
        'answer': 'v'
        },
        {
        'riddle': 'Arrache moi, griffe ma tête et du rouge viendra le noir. Qui suis-je ?',
        'answer': 'alumette'
        },
    ],
      currentRiddle: '',
      usedLetters: [],
      letters: ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'w', 'x', 'c', 'v', 'b', 'n']
    }
  }

  //When we click, a riddle is display
  displayRiddle = () => {
    return (
      this.state.currentRiddle !== ''  ?
        <div>
            {this.state.currentRiddle.riddle}
        </div>
      :
        <button onClick={this.handleClickRandomRiddle}>Afficher la devinette</button>
    )
  }

  handleClickRandomRiddle = () => {
    this.setState({
      usedLetters: []
    })
    let riddle = this.state.strings[Math.floor(Math.random()*this.state.strings.length)]
    this.setState({
      currentRiddle: riddle
    })
    return riddle
  }

  //We display '_' for each letter in answer
  computeDisplay = (strings, usedLetters) => {
    if (this.state.currentRiddle !== '') {
      return this.state.currentRiddle.answer.replace(/\w/g,
        (letter) => (usedLetters.includes(letter) ? letter : '_ ')
      )
    }
  }

  //We display a keyboard OR a congrat message (if player find solution)
  displayKeyboard = () => {
    let usedLetters = this.state.usedLetters
    if (this.computeDisplay(this.state.strings, this.state.usedLetters) !== this.state.currentRiddle.answer) {
      return this.state.letters.map((letter, key) => {
        return (
          <button id={letter} key={key} onClick={() => this.handleClickKeyboard(letter, usedLetters)}>{letter}</button>
        )
      })
    } else {
      return (
        <div>
          <h1>Félicitations, vous avez gagné !</h1>
          <button onClick={this.handleClickReplay}>Rejouer</button>
        </div>
      )
    }
  }

  //When player click on keyboard
  handleClickKeyboard = (letter, usedLetters) => {
    usedLetters.push(letter)
    if (this.state.usedLetters !== null) {
      this.setState({
        usedLetters: usedLetters
      })
      document.getElementById(letter).classList.add('AlreadyClick')
      document.getElementById(letter).setAttribute('disabled', 'true')
    }
  }

  //If player find solution and want to replay
  handleClickReplay = () => {
    this.setState({
      currentRiddle: '',
      usedLetters: []
    })
  }

  render() {
    return (
      <div>
        <h1 className="Title">Bienvenue sur le jeu du DuPeN</h1>
        <div className="Riddle">
          {this.displayRiddle()}
        </div>
        <div id="Answer">
          {this.computeDisplay(this.state.strings, this.state.usedLetters)}
        </div>
        <div id="Keyboard">
          {this.state.currentRiddle !== '' && this.displayKeyboard()}
        </div>
        <div className="Reload"><a href="/"><button>J'ai déjà répondu à cette devinette</button></a></div>
      </div>
    );
  }
}

export default App;
