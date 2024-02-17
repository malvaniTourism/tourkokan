import React, { useState, useRef } from "react"
import { FlatList, SafeAreaView, ScrollView, View, Platform, TouchableOpacity, PermissionsAndroid, TextInput, Text } from "react-native"
import GlobalText from "../Customs/Text"
import STRING from "../../Services/Constants/STRINGS"
import styles from "./Styles"
import { Comment } from "../../Services/Constants/FIELDS"
import TextField from "../Customs/TextField"

const CommentsSheet = ({ data, openCommentsSheet, closeCommentsSheet }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const addComment = () => {
        if (newComment.trim() !== '') {
            setComments([...comments, { id: comments.length + 1, text: newComment }]);
            setNewComment('');
        }
    };

    return (
        <View>
            <View style={styles.commentsHeader}>
                <GlobalText text={STRING.HEADER.COMMENTS} style={styles.fontBold} />
            </View>
            <View>
                {comments ?
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={comments}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={{ padding: 10 }}>
                                    <GlobalText text={item.text} />
                                </View>
                            )}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
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
