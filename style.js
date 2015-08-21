/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  StyleSheet
  } = React;
module.exports = StyleSheet.create({
  container: {
    flex: 1
  },
  //登录
  title: {
    flex: 0.5
  },
  loginContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    flex: 1,
    justifyContent: 'center'
  },
  loginInput: {
    flex: 1,
    width: 250,
    borderWidth: 1,
    margin: 5,
    borderRadius: 5
  },
  elseContainer: {
    flex: 1.6
  },
  button: {
    justifyContent: 'center',
    flex: 0.3,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'black',
    width: 100,
    alignItems: 'center'
  },
  text: {
    color: 'white'
  },
  //
  avatar: {
    borderRadius: 20,
    width: 38,
    height: 38
  },
  time: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  pic: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  postContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderWidth: 1,
    margin: 10
  },
  content: {
    margin: 10
  },
  scrollView: {
    backgroundColor: '#F6F6F6',
    height: 300
  }
});