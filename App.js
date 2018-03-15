import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

export default class App extends React.Component {
	state = {
		heading: null,
		compass: null
	};
	
	getPosition = async() => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status === 'granted') {
			let location = await Location.getCurrentPositionAsync({});
			this.setState({ location });

		};
		
	};
	
	processHeading = (compassData) => {
	
		let heading = compassData.magHeading;
		this.setState({ heading });
	}
	
	componentWillMount() {
		compass = Location.watchHeadingAsync(this.processHeading);
		this.setState({ compass });
	}
	
	componentWillUnmount() {
		let compass = this.state.compass;
		compass.remove();
	}
	
	rotatedStyle(rotation) {
		let rotationString;
		if(rotation) {
			rotationString = Math.round(360 - rotation) + 'deg';
		}
		else
		{
			rotationString = '0deg';
		}
		return {
			resizeMode: 'contain',
			height: '100%',
			width: '100%',
			transform: [
				{ rotateZ: rotationString },
			],			
		}
	}
	
	render() {		
		return (
		  <View style={styles.container}>
			<Image 
				source={require('./assets/rose.png')} 
				style={this.rotatedStyle(this.state.heading)}
			/>				
		  </View>
		);
	}
}

		const styles = StyleSheet.create({
			container: {
			flex: 1,
			backgroundColor: '#fff',
			alignItems: 'center',
			justifyContent: 'center',
			},

		});


