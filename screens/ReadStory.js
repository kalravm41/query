import React from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { Header, SearchBar } from 'react-native-elements';
import db from '../config';


export default class ReadStory extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            search : '',
            allStories : [],
            filterStories : [],
            last : []
        }
    }


    searchStories= async(text)=>{
        var stories = this.state.allStories;
        this.state.allStories.map((stories)=>{
            if(stories.title.toUpperCase()  === this.state.search || stories.author  === this.state.search || stories.story.toUpperCase()   === this.state.search){
                alert('JAY SHREE KRISHNA');
                var story = db.collection('stories').where('author','==','Marjin Heverbeke').get();
                story.docs.map((doc)=>{
                    this.setState({
                        filterStories : [...this.state.filterStories,doc.data()]
                  });
                });
                <FlatList
                data={this.state.filterStories}
                renderItem={({item})=>(
                    <View style={{borderBottomWidth: 2, margin: 5}}>
                        <Text>{'title: ' + item.title}</Text>
                        <Text>{'author: ' + item.author}</Text>
                        <Text>{'story: ' + item.story}</Text>
                    </View>
                )}
                keyExtractor={(item,index)=> index.toString()}
                onEndReachedThreshold={0.7}
                />
            }
        });
    }


     componentDidMount = async()=>{
        var stories = db.collection('stories').get();
        (await stories).docs.map((doc)=>{
        this.setState({
            allStories : [...this.state.allStories,doc.data()]
      });
    });
  }


    render(){
        const stories1 = this.state.allStories;
        return(
            <View style={{flex: 1 , backgroundColor: '#fff'}}>
                <TextInput  style={styles.inputBox} 
                placeholder= 'Search Here...'
                value = {this.state.search}
                onChangeText = {(text)=>{this.setState({search: text})}}/> 

                <TouchableOpacity
                onPress= {()=>{
                    if(this.state.search.trim()){
                    this.searchStories(this.state.search)
                    }
                    else{
                        alert('JAY SHREE RAM');
                    }
                    }}>
                    <Text style={styles.submitButton}>Search</Text>
                </TouchableOpacity>
                <FlatList
                data={this.state.allStories}
                renderItem={({item})=>(
                    <View style={{borderBottomWidth: 2, margin: 5}}>
                        <Text>{'title: ' + item.title}</Text>
                        <Text>{'author: ' + item.author}</Text>
                        <Text>{'story: ' + item.story}</Text>
                    </View>
                )}
                keyExtractor={(item,index)=> index.toString()}
                onEndReachedThreshold={0.7}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    inputBox:{
        margin : 20,
        borderWidth: 1.5,
        borderRightWidth: 1,
        fontSize: 20,
        alignSelf :'center',
        textAlign : 'center'
      },
      inputBox1:{
        width : 380,
        height: 250,
        margin : 20,
        borderWidth: 1.5,
        borderRightWidth: 1,
        fontSize: 20,
        alignSelf :'center',
        textAlign : 'center'
      },
      submitButton:{
        backgroundColor: '#2196F3',
        padding: 10,
        margin: 10,
        width: 80,
        height: 40,
        alignSelf: 'center'
      },
      buttonText:{
        fontSize: 15,
        textAlign: 'center',
      },
});