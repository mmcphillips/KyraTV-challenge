import React from 'react';
import { Line } from 'react-chartjs-2';
import { Container } from '@material-ui/core/';
import { CContainer } from '../styles.jsx';

export default class CChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      material: {},
    };
  }

  componentDidMount(props) {
    const hist = this.props.history.slice();
    const dates = [];
    const uploads = [];
    hist.forEach((item) => {
      dates.push(item.date);
      uploads.push(item.uploads);
    });

    const material = {
      labels: dates,
      datasets: [
        {
          label: 'Uploads',
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#fff',
          borderColor: 'rgb(255, 186, 0)',
          borderWidth: 2,
          data: uploads,
        },
      ],
    };
    this.setState({
      loading: false,
      material,
    });
  }

  render() {
    if (this.state.loading === true) {
      return (<div>loading</div>);
    }

    return (
      <Container
        style={CContainer}
      >
        <Line
          data={this.state.material}
          options={{
            title: {
              display: true,
              text: 'Uploads per day',
              fontColor: 'rgb(255, 186, 0)',
              fontFamily: 'TitlingGothicFBWideBold',
              fontStyle: 'bold',
              fullWidth: 'true',
              fontSize: '15',
            },
            plugins: {
              datalabels: {
              },
            },
            legend: {
              display: true,
              position: 'top',
            },
            maintainAspectRatio: false,
            responsive: true,
            aspectRatio: 1,
            onResize: null,
          }}
        />
      </Container>
    );
  }
}
