import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function RunButton(props) {
	return (
	  <button className="control-button run-btn" onClick={props.onClick}>
		Run
	  </button>
	);
  }
  
  function PauseButton(props) {
	return (
	  <button className="control-button pause-btn" onClick={props.onClick}>
		Pause
	  </button>
	);
  }
  
  class TopPanel extends React.Component {
	constructor(props) {
	  super(props);
	  this.handleRunClick = this.handleRunClick.bind(this);
	  this.handlePauseClick = this.handlePauseClick.bind(this);
	  this.state = {isRun: true};
	}
  
	handleRunClick() {
	  
	  if (this.props.aliveCount > 0) {
	   this.props.runGame();
		this.setState({isRun: true});
	  }
	}
  
	handlePauseClick() {
	  this.setState({isRun: false});
	  this.props.pauseGame();
	}
	
	clearBoard() {
	  this.setState({isRun: false});
	  this.props.clearGame(true);
	}
	randomBoard() {
	  this.props.clearGame();
	}
	render() {
	  let panelWidth = {
		width: this.props.width
	  };
	  const isRun = this.state.isRun;
	  
	  const buttonRP = isRun ? (
		<PauseButton onClick={this.handlePauseClick} />
	  ) : (
		<RunButton onClick={this.handleRunClick} />
	  );
	  return (
		<div
		  style={panelWidth}
		  className="top-controls"
		>
		  {buttonRP}
  
		  <button
			className="control-button clr-btn"
			onClick={this.clearBoard.bind(this)}
		  >
			Clear
		  </button>
		  <button className="control-button sd-btn" onClick={this.randomBoard.bind(this)}>Seed</button>
			
		  <div
			className="generations"
		  >
			Generations: {this.props.generations}
		  </div>
		</div>
	  );
	}
  }
  
  class BottomPanel extends React.Component {	
	small() {
	  this.props.gridSize("s");
	}
	medium() {
	  this.props.gridSize("m");
	}
	large() {
	  this.props.gridSize("l");   
	}
	slow() {
	  this.props.slow();   
	}
	med() {
	  this.props.med();   
	}
	fast() {
	  this.props.fast();   
	}
	  render() {
	  let ssColor = this.props.ss ? "rgba(255, 107, 107,1)" : "rgba(0,0,0,1)";
	  let mmColor = this.props.mm ? "rgba(255, 107, 107,1)" : "rgba(0,0,0,1)";
	  let ffColor = this.props.ff ? "rgba(255, 107, 107,1)" : "rgba(0,0,0,1)";
	  let ssStyle = {
		background: ssColor
	  }
	  let mmStyle = {
		background: mmColor
	  }
	  let ffStyle = {
		background: ffColor
	  }
	  let bsS = this.props.bsSmall ? "rgba(255, 107, 107,1)" : "rgba(0,0,0,1)";
	  let bsM = this.props.bsMedium ? "rgba(255, 107, 107,1)" : "rgba(0,0,0,1)";
	  let bsL = this.props.bsLarge ? "rgba(255, 107, 107,1)" : "rgba(0,0,0,1)";
	  let bssStyle = {
		background: bsS
	  }
	  let bsmStyle = {
		background: bsM
	  }
	  let bslStyle = {
		background: bsL
	  }
		  return (
			  <div className="bottom-controls">
				  <div className="bs">Board Size:</div>
				  <button className="control-button" onClick={this.small.bind(this)} style={bssStyle}>50x30</button>
				  <button className="control-button" onClick={this.medium.bind(this)} style={bsmStyle}>70x50</button>
				  <button className="control-button" onClick={this.large.bind(this)} style={bslStyle}>90x70</button>  
				  <div className="bs">Run Speed:&nbsp;</div>
				  <button className='control-button1' onClick={this.slow.bind(this)} style={ssStyle}>Slow</button>
				  <button className='control-button1' onClick={this.med.bind(this)} style={mmStyle}>Medium</button>
		  <button className='control-button1' onClick={this.fast.bind(this)} style={ffStyle}>Fast</button>
			  </div>
			  )
	  }
  }
  
  class Person extends React.Component {
	clickSquare() {
	  this.props.clickSquare(this.props.id);
	}
  
	render() {
	  let aliveColor = this.props.newPerson ? "rgba(255, 107, 107,1)" : "rgba(255, 107, 107, 0.6)";
	  let backgroundColor = this.props.isAlive ? aliveColor : 'none';
	  let squareStyle = {
		height: this.props.squareSize,
		width: this.props.squareSize,
		background: backgroundColor
	  }
	  return (
		<span
		  onClick={this.clickSquare.bind(this)}
		  className={"person"} style={squareStyle}>
		</span>
	  );
	}
  }
  
  class Game extends React.Component {
	constructor(props) {
	  super(props);
  
	  this.state = {
		people: [],
		squareSize: 12,
		numCols: 70,
		numRows: 50,
		generations: 1,
		aliveStates: null,
		paused: false,
		aliveCount: 0,
		newPeople: [],
		speed: 500,
		mm: true,
		ff: false,
		ss: false,
		bsSmall: false,
		bsMedium: true,
		bsLarge: false
	  };
	}
  
	componentWillMount() {
	  // stores keys of coordinates with alive or dead boolean.
	  // example: aliveStates['0,0'] = 1 (true);
	  this.resetBoard();
	}

	resetBoard(clearSquares = false) {
	  clearTimeout(this.timeO);
	  let aliveStates = {}
	  let aliveCount = 0;
	  let people = [];
	  if (clearSquares) {
		this.setState({
		  paused: true
		});
	  }
	  let alive;
	  for (let row = 0; row < this.state.numRows; row++) {
		// Make columns
		for (let col = 0; col < this.state.numCols; col++) {
		  if (clearSquares) {
			alive = 0;
		  }
		  else {
			alive = Math.floor(Math.random() * 5) === 1 ? 1 : 0;
			people.push([row, col]);
		  }
		  if (alive === 1) {
			aliveCount++;
		  }
		  aliveStates[`${row},${col}`] = alive;
		}
	  }
  
	  if (clearSquares) {
		this.setState({
		  aliveStates: aliveStates,
		  generations: 0,
		  aliveCount: 0
		});
	  }
	  else {
		let amount = this.state.numRows * this.state.numCols;
		this.setState({
		  people: people,
		  aliveStates: aliveStates,
		  totalSquares: amount,
		  aliveCount: aliveCount
		});
	  }
	}
	
	gridSize = (size) => {
		clearTimeout(this.timeO);
		switch (size) {
		  case "s":
			this.setState({
			  numCols: 50,
			  numRows: 30,
			  squareSize: 14,
			  bsMedium: false,
			  bsLarge: false,
			  bsSmall: true
			}, ()=> this.resetBoard());
		  break;
		  case "l":
			this.setState({
			numCols: 90,
			numRows: 70,
			squareSize: 10,
			bsSmall: false,
			  bsMedium: false,
			  bsLarge: true  
			}, ()=> this.resetBoard());
		  break;
		  default:
			this.setState({
				numCols: 70,
				numRows: 50,
			  squareSize: 12,
			  bsSmall: false,
			  bsLarge: false,
			  bsMedium: true
			  
			}, ()=> this.resetBoard());
		}
	  }
  
	slow = () => {
	  clearTimeout(this.timeO);
		  this.setState({
			  speed: 1000,
		mm : false,
		ff: false,
		ss : true
		  });
	  }
  
	  medium = () => {
	  clearTimeout(this.timeO);
		  this.setState({
			  speed: 500,
		ss : false,
		ff: false,
		mm : true
		  });
	  }
  
	  fast = () => {
	  clearTimeout(this.timeO);
		  this.setState({
			  speed: 80,
		ss : false,
		mm: false,
		ff : true
		  });
	  }
	
	getNeighbors(currentRow, currentCol) {
	  let numCols = this.state.numCols;
	  let numRows = this.state.numRows;
	  let moveDirections = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		[0, 1],
		[1, -1],
		[1, 0],
		[1, 1]
	  ];
  
	  let currentPair = [];
	  let neighbors = moveDirections.map(pair => {
		currentPair = [currentRow + pair[0], currentCol + pair[1]];
		if (currentPair[0] < 0) {
		  currentPair = [numRows - 1, currentPair[1]];
		}
  
	   else if (currentPair[0] >= numRows) {
		  currentPair = [0, currentPair[1]];
		}
  
		if (currentPair[1] >= numCols) {
		  currentPair = [currentPair[0], 0];
		}
  
		else if (currentPair[1] < 0) {
		  currentPair = [currentPair[0], numCols - 1];
		}
		return currentPair;
	  });
	  return neighbors;
	}
  
	checkAlive(isAlive,currentRow, currentCol) {
	  // returns 2 dimensional array of neighbors
	  let neighbors = this.getNeighbors(currentRow, currentCol);
  
	  let livingNeighbors = 0;
  
	  for (var i = 0; i < neighbors.length; i++) {
		if (this.state.aliveStates[`${neighbors[i][0]},${neighbors[i][1]}`] === 1) {
		  livingNeighbors += 1;
		}
	  }
  
	  if (isAlive === 1) {
		if (livingNeighbors < 2 || livingNeighbors > 3) {
		  return 0;
		}
		return 1;
	  }
  
	  else {
		// wasn't alive
		if (livingNeighbors === 3) {
		  return 1;
		}
		return 0;
	  }
	}
  
	updatePopulation() {
	  let people = this.state.people;
	  let newPeople = [];
	  let aliveCount = 0;
	  let aliveStates = JSON.parse(JSON.stringify(this.state.aliveStates));
  
	  for(let i = 0; i < this.state.totalSquares; i++) {
		let currentRow = people[i][0];
		let currentCol = people[i][1];
		let location = `${currentRow},${currentCol}`;
		let wasAlive = aliveStates[location];
		let isAlive = this.checkAlive(wasAlive, currentRow, currentCol);
  
		if (wasAlive) {
		  aliveCount++;
		}
  
		if (!wasAlive && isAlive) {
		  newPeople.push(location);
		}
  
		aliveStates[location] = isAlive;
	  }
  
	  this.timeO = setTimeout(() => {
		if (this.state.paused) {
		  return;
		}
		if (aliveCount === 0) {
		   this.setState({
			aliveStates: aliveStates,
			generations: 0,
			aliveCount: 0,
			paused: true,
			newPeople: []
		  });
		  return;
		}
  
		this.setState({
		  aliveStates: aliveStates,
		  generations: this.state.generations + 1,
		  aliveCount: aliveCount,
		  newPeople: newPeople,
		  updateQueue: []
		});
	  }, this.state.speed);
	}
  
	renderSquares() {
	  if (!this.state.paused && this.state.aliveCount > 0) {
	   this.updatePopulation();
	  }
	  if (!this.state.people || this.state.people.length < 1 || !this.state.aliveStates) {
		return null;
	  }
	  let aliveStates = this.state.aliveStates;
	  let newPeople = this.state.newPeople;
	  let alive;
	  let coords;
	  let result = this.state.people.map(location => {
		coords = `${location[0]},${location[1]}`;
		alive = aliveStates[coords];
		let newPerson = newPeople.indexOf(coords) !== -1 ?
			true : false;
		return (
		  <Person
			key={coords}
			id={coords}
			squareSize={this.state.squareSize}
			clickSquare={this.clickSquare.bind(this)}
			newPerson={newPerson}
			isAlive={alive}
		  />
		);
	  });
	  return result;
	}
	// Controls
	pauseGame() {
	  this.setState({
		paused: true
	  });
	}
  
	runGame() {
	  clearTimeout(this.timeO);
	  if (this.state.aliveCount > 0) {
		this.setState({
		  paused: false
		});
	  }
	}
  
	// Handles updating squares
	clickSquare(location) {
	  let aliveStates = JSON.parse(JSON.stringify(this.state.aliveStates));
	  let aliveCount = this.state.aliveCount;
	  let newPeople = JSON.parse(JSON.stringify(this.state.newPeople));
	  let alive = aliveStates[location] === 0 ? 1 : 0;
		aliveStates[location] = alive;
	  if (this.state.paused) {
		if (alive) {
		  aliveCount++;
		  if (newPeople.indexOf(location) === -1) {
			newPeople.push(location);
		  }
		}
		else {
		  aliveCount--;
		}
		this.setState({
		  aliveStates: aliveStates,
		  aliveCount: aliveCount,
		  newPeople: newPeople
		});
	  }
	}
  
	render() {
	  let gameStyles = {
		height: this.state.numRows * this.state.squareSize + 1.5 + 'px',
		width: this.state.numCols * this.state.squareSize + 1.5 + 'px'
	  }
	  return (
		  <div className="game-of-life">
			<div
			  id="game"
			  style={gameStyles}
			>
			  <TopPanel
				width={this.state.numCols * this.state.squareSize * 3 / 5}
				generations={this.state.generations}
				pauseGame={this.pauseGame.bind(this)}
				runGame={this.runGame.bind(this)}
				aliveCount={this.state.aliveCount}
				clearGame={this.resetBoard.bind(this)}
  
			  />
			  {this.renderSquares()}
					  <BottomPanel
				gridSize={this.gridSize.bind(this)}
				slow={this.slow.bind(this)}
				med={this.medium.bind(this)}
				fast={this.fast.bind(this)}
				ss={this.state.ss}
				mm={this.state.mm}
				ff={this.state.ff}
				bsSmall={this.state.bsSmall}
				bsMedium={this.state.bsMedium}
				bsLarge={this.state.bsLarge}
				/>
			</div>
		</div>
	  );
	}
  }
  
  ReactDOM.render(
	<Game />, document.getElementById('container')
  );