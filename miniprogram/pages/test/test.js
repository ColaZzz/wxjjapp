Page({
  data: {
    items: [{
        type: 'radio',
        label: '出售状态',
        value: '出售状态',
        children: [{
            label: '在售',
            value: '在售',
          },
          {
            label: '售完',
            value: '售完',
          },
          {
            label: '未开盘',
            value: '未开盘',
          },
        ],
        groups: [1],
      },
      {
        type: 'sort',
        label: '售价',
        value: '售价',
        groups: [2],
      },
      {
        type: 'text',
        label: '重置',
        value: '重置',
        groups: [3],
      }
    ],
  },
  onLoad() {

  },
  onChange(e) {
    const {
      checkedItems,
      items
    } = e.detail

    console.log(checkedItems, items)
  },
  onOpen(e) {

  },
  onClose(e) {

  },
})