/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var ReactNativeStore = require('react-native-store');
var _ = require('lodash');

var {
  ListView,
  Text,
  View,
  Image,
  ScrollView
  } = React;

var styles = require('./style');
var post = React.createClass({
  getInitialState() {
    return {
      searchString: 1,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  },
  componentDidMount() {
    var _this = this;
    ReactNativeStore.table("user").then(function (user) {
      var token = user.get(1)[0].token;
      var url = `http://test.hushijiajia.com/api/v2/post?style=square&pageNum=${_this.state.searchString}`;
      fetch(url, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-user-token": token
        }
      })
        .then(res => res.json())
        .then(function (res) {
          _this.setState({dataSource: _this.state.dataSource.cloneWithRows(res.posts)});
        })
        .catch(function (error) {
          console.log('Request failed', error);
        });
    });
  },
  _renderRow(rowData) {
    var avatar = rowData.url;
    if (avatar == null) {
      avatar = 'http://7xiqfk.com2.z0.glb.qiniucdn.com/FgYT6BregRcznVgyyQDrPOWmqky3'
    }
    var url1 = rowData.url1 ? rowData.url1 : ' ';
    var url1Visiable = url1 === ' ' ? 0 : 80;
    var url2 = rowData.url2 ? rowData.url2 : ' ';
    var url2Visiable = url2 === ' ' ? 0 : 80;
    var url3 = rowData.url3 ? rowData.url3 : ' ';
    var url3Visiable = url3 === ' ' ? 0 : 80;
    return (
      <View style={styles.postContainer}>
        <Text >{rowData.nickname}</Text>
        <View style={styles.time}>
          <Image
            style={styles.avatar}
            source={{uri: avatar}}
            />
          <Text>{rowData.time}</Text>
        </View>
        <Text style={styles.content}>{rowData.content}</Text>
        <View style={styles.pic}>
          <Image
            style={{height: url1Visiable, width: url1Visiable}}
            source={{uri: url1}}
            />
          <Image
            style={{height: url2Visiable, width: url2Visiable}}
            source={{uri: url2}}
            />
          <Image
            style={{height: url3Visiable, width: url3Visiable}}
            source={{uri: url3}}
            />
        </View>
      </View>
    );
  },
  render: function () {
    return (
      <ScrollView onScroll={() => {}}
                  scrollEventThrottle={200}
                  contentInset={{top: -50}}
                  style={styles.scrollView}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          />
      </ScrollView>
    );
  }
});
module.exports = post;