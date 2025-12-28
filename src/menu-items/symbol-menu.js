import InventoryIcon from '@mui/icons-material/Inventory'
const SymbolMenu = {
    id: 'symbolRoot',
    title: '股票菜单',
    type: 'group',
    icon: InventoryIcon,
    children: [
        {
            id: 'clients',
            title: '股票列表',
            type: 'item',
            icon: InventoryIcon,
            url: '/symbol'
        }
    ]
}
export default SymbolMenu