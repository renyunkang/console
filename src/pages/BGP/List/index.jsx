import React, { Component } from 'react'
import moment from "moment"
import BGPStore from '../../../stores/bgp'
import withList from '../../../components/HOCs/withList'
import Table from '../../../components/Tables/List'
import Banner from '../../../components/Banner'
import { ListPage } from '../../../components/HOCs/withList'
import styles from './index.module.scss'
import connect from '../../../assets/connectactivestatusdot.svg'
import established from '../../../assets/establishedstatusdot.svg'
import idle from '../../../assets/idlestatusdot.svg'
import opensent from '../../../assets/opensentconfirmstatusdot.svg'
import { Icon } from "@kube-design/components"

class List extends Component {
  get routing() {
    return this.props.rootStore.routing
  }

  get BannerProps() {
    return {
      icon: 'gateway-duotone',
      title: 'BGP',
      description:
        "BGP, Border Gateway Protocol, is a dynamic routing protocol that uses the TCP protocol for communication. BGP exchanges routing information between different autonomous systems (AS).",
      tips: [
        {
          title: 'What is an Autonomous System (AS)?',
          description: 'An autonomous system is a collection of connected Internet Protocol routing prefixes under the control of one or more network operators on behalf of a single administrative entity or domain, that presents a common and clearly defined routing policy to the Internet.'
        },
        {
          title: 'How to configure local BGP properties and peer BGP properties using BgpConf and BgpPeer?',
          description: "You can easily create BgpConf and BgpPeer resource using the Web UI and that'll configure local BGP properties and peer BGP properties."
        },
      ]
    }
  }

  handleCreateClick = () => {
    console.log('Do you want ro create a BGP? Do it.')
  }

  getColumns() {
    const { getSortOrder } = this.props

    return [
      {
        title: 'BgpPeer Name',
        dataIndex: 'name',
        sortOrder: getSortOrder('name'),
        search: true,
        sorter: true,
        isHideable: true,
        with: '17.44%',
        render: (name, record) => {
          return <div className={styles.name}>
            <Icon name="conversion-node" size={40} />
            <div>
              <text>{name}</text>
              {record.description}
            </div>
          </div>
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        isHideable: true,
        with: '9.09%',
        render: (status, record) => {
          let statusText
          let statusIcon
          switch (status) {
            case 'IDLE':
              statusText = 'Idle'
              statusIcon = idle
              break
            case 'ESTABLISHED':
              statusText = 'Established'
              statusIcon = established
              break
            case 'ACTIVE':
              statusText = 'Active'
              statusIcon = connect
              break
            case 'OPENSENT':
              statusText = 'OpenSent'
              statusIcon = opensent
              break
            case 'OPENCONFIRM':
              statusText = 'OpenConfirm'
              statusIcon = opensent
              break
            default:
              break
          }
          return <div className={styles.status}>
            <img src={statusIcon} alt=""></img>
            <text>{statusText}</text>
          </div>
        }
      },
      {
        title: 'Local AS',
        dataIndex: 'localAs',
        isHideable: true,
        with: '9.09%',
        render: (localAs, record) => {
          return <div>{localAs}</div>
        }
      },
      {
        title: 'Peer AS',
        dataIndex: 'peerAs',
        isHideable: true,
        with: '9.09%',
        render: (peerAs, record) => {
          return <div>{peerAs}</div>
        }
      },
      {
        title: 'Neighbor Address',
        dataIndex: 'neighborAddress',
        isHideable: true,
        with: '9.09%',
        render: (neighborAddress, record) => {
          return <div>{neighborAddress}</div>
        }
      },
      {
        title: 'Peer Type',
        dataIndex: 'peerType',
        isHideable: true,
        with: '9.09%',
        render: (peerType, record) => {
          return <div>{peerType}</div>
        }
      },
      {
        title: 'SendMax',
        dataIndex: 'sendMax',
        isHideable: true,
        with: '9.09%',
        render: (sendMax, record) => {
          return <div>{sendMax}</div>
        }
      },
      {
        title: 'BgpPeer Leaf',
        dataIndex: 'bgpPeerLeaf',
        isHideable: true,
        with: '9.09%',
        render: (bgpPeerLeaf, record) => {
          return <div>{bgpPeerLeaf}</div>
        }
      },
      {
        title: 'Creation Time',
        dataIndex: 'createTime',
        isHideable: true,
        with: '10.17%',
        render: (createTime, record) => {
          const date = new Date(createTime)
          return <div>{moment(date).format('YYYY-MM-DD hh:mm:ss') || '-'}</div>
        }
      }
    ]
  }

  render() {
    const { tableProps } = this.props

    return (
      <>
        <Banner {...this.BannerProps} />
        <ListPage {...this.props}>
          <Table
            {...tableProps}
            columns={this.getColumns()}
            onCreate={this.handleCreateClick}
            searchType={'name'}
          />
        </ListPage>
      </>
    )
  }
}

export default withList({ store: new BGPStore(), module: 'bgp' })(List)