/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var ReactNativeStore = require('react-native-store');
var {
  AppRegistry,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  NavigatorIOS,
  AlertIOS
  } = React;
var styles = require('./style');
var post = require('./post');
var login = React.createClass({
  getInitialState: function () {
    return {
      phone_number: '',
      password: '',
      token: '',
      logged: false
    };
  },
  componentDidMount() {
    var _this = this;
    ReactNativeStore.table("user").then(function (user) {
      if (user.get(1)[0].token) {
        _this.props.navigator.push({
          title: '广场',
          component: post
        });
      } else {
        _this.props.navigator.push({
          title: '广场',
          component: index
        });
      }
    })
  },
  _login() {
    var _this = this;
    var phone_number = _this.state.phone_number;
    var password = _this.state.password;
    var url = 'http://test.hushijiajia.com/api/v1/user/login';
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: 'phone_number=' + phone_number + '&password=' + password
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        AlertIOS.alert('账号或密码错误');
        return response.json();
      }
    }).then(function (body) {
      ReactNativeStore.table("user").then(function (user) {
        var token = body.user.access_token;
        if (user.get(1)[0].token) {
          var data = {
            token: token,
            phoneNumber: body.user.phone_number
          };
          user.updateById(1, data);
          _this.props.navigator.push({
            title: '广场',
            component: post
          });
        } else {
          user.add({
            token: token,
            phoneNumber: body.user.phone_number
          });
          console.log('第一次');
          _this.props.navigator.push({
            title: '广场',
            component: post
          });
        }
      });
    }).catch(function (error) {
      console.log('Request failed', error)
    });
  },
  render: function () {
    return (
      <View style={styles.container}>
        <View style={styles.elseContainer}>
        </View>
        <View style={styles.loginContainer}>
          <View style={styles.input}>
            <TextInput style={styles.loginInput}
                       placeholder='用户名'
                       onChangeText={(e) => this.setState({phone_number: e})}
              />
            <TextInput style={styles.loginInput}
                       placeholder='密码'
                       onChangeText={(e) => this.setState({password: e})}
              />
          </View>
          <TouchableHighlight style={styles.button} onPress={this._login}>
            <Text style={styles.text}>登录</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.elseContainer}>
        </View>
      </View>
    )
  }
});
var index = React.createClass({

  render: function () {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: '登录',
          component: login
          }}
        />
    );
  }
});

AppRegistry.registerComponent('demo', () => index);
