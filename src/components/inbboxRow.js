import React, { PropTypes } from 'react'

import moment from 'moment';

import {
    Text,
    Base,
    Image,
    TouchableRowCell
} from 'panza'

/**
 * The basic RowCell that I use about 80% of the time. It displays
 * an image, primary text, secondary text, a value,
 * and an arrow right icon if the respective props are
 * specified.
 * @composes TouchableRowCell, Image, Text
 */

const InboxRow = ({
    title,
    text,
    tags,
    time,
    value,
    onPress,
    image,
    height,
    ...other
    }) => (
    <TouchableRowCell
        height={height}
        py={2}
        onPress={onPress}
        {...other}
        style={{ borderBottomWidth: .75, borderColor: 'rgba(0, 0, 0, 0.25)' }}
    >
        {image && (
            <Image mr={2} width={40} height={40} source={image} />
        )}

        <Base flex={1} row align='flex-start' justify='space-between'>
            <Base flex={.8}>
                {title && (
                    <Text bold lineHeight={2} numberOfLines={1}>{title}</Text>
                )}
                {tags && (
                    <Text small lineHeight={2} numberOfLines={1}>{tags}</Text>
                )}
                {text && (
                    <Text small lineHeight={2} light numberOfLines={4}>{text}</Text>
                )}
            </Base>

            <Base flex={.2}>
                {time && (
                    <Text light>{moment(time).format('D.M.YY hh:mm')}</Text>
                )}
            </Base>
        </Base>
    </TouchableRowCell>
)

InboxRow.displayName = 'InboxRow'

InboxRow.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    tags: PropTypes.string,
    time: PropTypes.string,
    value: PropTypes.string,
    onPress: PropTypes.func,
    image: PropTypes.object,
    height: PropTypes.number
}

export default InboxRow