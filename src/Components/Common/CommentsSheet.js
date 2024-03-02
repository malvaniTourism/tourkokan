import React, { useState, useRef } from "react"
import { FlatList, SafeAreaView, ScrollView, View, Platform, TouchableOpacity, PermissionsAndroid, TextInput, Text } from "react-native"
import GlobalText from "../Customs/Text"
import STRING from "../../Services/Constants/STRINGS"
import styles from "./Styles"
import { Comment } from "../../Services/Constants/FIELDS"
import TextField from "../Customs/TextField"
import DIMENSIONS from "../../Services/Constants/DIMENSIONS"

const CommentsSheet = ({ data, openCommentsSheet, closeCommentsSheet }) => {
    const [comments, setComments] = useState(data);
    const [newComment, setNewComment] = useState('');

    const addComment = () => {
        if (newComment.trim() !== '') {
            setComments([...comments, { id: comments.length + 1, text: newComment }]);
            setNewComment('');
        }
    };

    const renderComments = ({ item }) => {
        return (
            <View style={{ padding: 10 }}>
                <GlobalText text={item.comment} style={{ textAlign: "left" }} />
                <FlatList
                    data={item.comments}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderSubComments}
                />
            </View>
        )
    }

    const renderSubComments = ({ item }) => {
        return (
            <View style={{ padding: 10 }}>
                <GlobalText text={item.comment} style={{ textAlign: "left" }} />
            </View>
        )
    }

    return (
        <View>
            <View style={styles.commentsHeader}>
                <GlobalText text={STRING.HEADER.COMMENTS} style={styles.fontBold} />
            </View>
            <View>
                {comments ?
                    <View style={{justifyContent: "space-between", height: "94%"}}>
                        <View>
                            <FlatList
                                data={comments}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={renderComments}
                            />
                        </View>
                        <View style={{}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, justifyContent: "center", width: DIMENSIONS.screenWidth - 50 }}>
                                {Comment.map((field, index) => {
                                    return (
                                        <TextField
                                            name={field.name}
                                            label={field.name}
                                            placeholder={field.placeholder}
                                            fieldType={field.type}
                                            length={field.length}
                                            required={field.required}
                                            disabled={field.disabled}
                                            value={newComment}
                                            setChild={(v) => setNewComment(v)}
                                            style={styles.containerStyle}
                                            inputContainerStyle={styles.profileContainerStyle}
                                            isSecure={field.isSecure}
                                        />
                                    );
                                })}
                                <TouchableOpacity onPress={addComment} style={{ marginLeft: 10 }}>
                                    <GlobalText text={"POST"} style={{ color: "blue" }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    :
                    <View style={styles.noComments}>
                        <GlobalText text={STRING.NO_COMMENTS} style={styles.fontBold} />
                        <GlobalText text={STRING.START_CONVO} />
                    </View>
                }
            </View>
        </View>
    )
}

export default CommentsSheet
