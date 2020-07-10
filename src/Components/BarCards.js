import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class BarCards extends Component  {
  constructor(props) {
    super(props);
    this.sayHello = this.sayHello.bind(this);
      this.position = props.position;
  }
  sayHello(){
    alert(this.props.phone)
  }
  
  render() {
  return (
    <div style={{padding:'2vw'}}>
      <Card style={{width: "20vw", margin: 'auto', maxWidth: '30vw', height: '40vh'}}>
        <CardActionArea>
          <CardMedia
            style={{height: 140}}
            src = {"data:image/png;base64," + this.props.image}
            component="img"
            title={this.props.name}
          />
          <CardContent style={{backgroundColor: '#ffff'}}>
            <Typography gutterBottom variant="h5" component="h2">
            {this.props.name}
          </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.props.description}<br/>
              {this.props.adresse}
          </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{backgroundColor: '#ffff'}}>
          <Button size="small" color="primary">
            Partager
        </Button>
          <Button size="small" color="primary" onClick={this.sayHello}>
            Voir le numéro du bar
        </Button>
        <Typography variant="body2" color="textSecondary" component="p">Note : {this.props.note}/5</Typography>
        </CardActions>
      </Card>
    </div>
  );
  }
}
export default BarCards
