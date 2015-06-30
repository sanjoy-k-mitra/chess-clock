/**
 * Created by sanjoy on 6/30/15.
 */

var ChessClock = React.createClass({
    getInitialState: function () {
        this.active = 0;
        var clocks = [{elapsed: 0, remaining: 240},{elapsed: 0, remaining: 240}];
        return {clocks: clocks, currentStatus: "Next Move : Player 1"}
    },
    reset: function(){
        this.stop0();
        this.stop1();
        this.active = 0;
        var clocks = [{elapsed: 0, remaining: 240},{elapsed: 0, remaining: 240}];
        this.setState({clocks: clocks, currentStatus: "Next Move : Player 1"});
    },
    tick0: function(){
        var elapsed = Math.round((new Date() - this.startTime0)/1000);
        this.state.clocks[0].elapsed = elapsed;
        this.state.clocks[0].remaining = 240 - elapsed;
        if(this.state.clocks[0].remaining <= 0){
            this.stop0();
            this.active = -1;
            this.state.currentStatus = "Player 2 has won the Game";
        }
        this.setState(this.state);
    },
    tick1: function () {
        var elapsed = Math.round((new Date() - this.startTime1)/1000);
        this.state.clocks[1].elapsed = elapsed;
        this.state.clocks[1].remaining = 240 - elapsed;
        if(this.state.clocks[1].remaining <= 0){
            this.stop1();
            this.active = -1;
            this.state.currentStatus = "Player 1 has won the Game";
        }
        this.setState(this.state);
    },
    start0: function(){
        this.startTime0 = new Date();
        this.timer0 = setInterval(this.tick0, 50);
    },
    start1:function(){
        this.startTime1 = new Date();
        this.timer1 = setInterval(this.tick1, 50);
    },
    stop0: function () {
        clearInterval(this.timer0);
        this.state.clocks[0].elapsed = 0;
        this.state.clocks[0].remaining = 240;
        this.setState(this.state);
    },
    stop1: function(){
        clearInterval(this.timer1);
        this.state.clocks[1].elapsed = 0;
        this.state.clocks[1].remaining = 240;
        this.setState(this.state);
    },
    player0Moved: function () {
        if(this.active!= 0){
            return;
        }
        this.stop0();
        this.active = 1;
        this.state.currentStatus= "Next Move : Player 2"
        this.start1();
    },
    player1Moved: function () {
        if(this.active!= 1){
            return;
        }
        this.stop1();
        this.active = 0;
        this.state.currentStatus= "Next Move : Player 1"
        this.start0();
    },
    roundDoubleDigit: function(number){
        return ("0" + number).slice(-2);
    },
    render: function () {
        return (
            <div className="chess-clock">
                <div className="current-status">
                    {this.state.currentStatus}
                </div>
                <div className="clock-container">
                    <div className="clock" onClick={this.player0Moved}>
                        {Math.floor(this.state.clocks[0].remaining / 60)}:{this.roundDoubleDigit(this.state.clocks[0].remaining % 60)}
                    </div>
                    <div className="clock-space"></div>
                    <div className="clock " onClick={this.player1Moved}>
                        {Math.floor(this.state.clocks[1].remaining / 60)}:{this.roundDoubleDigit(this.state.clocks[1].remaining % 60)}
                    </div>
                </div>
                <div className="chess-clock-base">
                </div>
                <div className="chess-clock-controls">
                    <button onClick={this.reset}>Reset</button>
                </div>
            </div>
        );
    }
});


React.render(<ChessClock/>, document.getElementById('content'));