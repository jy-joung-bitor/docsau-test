import { usePrisma } from './PrismaContext';
import { Props } from '@theme/Tabs';
import { useTabs } from '@docusaurus/theme-common/internal';
import init from './init.json';
import { Button, Label, ListBox, ListBoxItem, Popover, Select, SelectValue } from 'react-aria-components';

function PrismaSwitcher(props: Props) {
    const { groupId } = props;
    const { selectedValue, selectValue, tabValues } = useTabs(props);
    const options = tabValues.map(({ value }) => ({ name: value }));

    const onChange = (value: string) => {
        selectValue(value);
    }

    return (
        <Select name={groupId} value={selectedValue} onChange={onChange}>
            <Label>{groupId}</Label>
            <Button>
                <SelectValue />
            </Button>
            <Popover>
                <ListBox items={options}>
                    {
                        ({ name }) => (
                            <ListBoxItem id={name} textValue={name}>
                                <img src={`/img/tech/${name}.svg`} width={24} height={24} /> {name}
                            </ListBoxItem>
                        )
                    }
                </ListBox>
            </Popover>
        </Select>
    );
}

export default function PrismaSwitcherList() {
    const settings = usePrisma();
    const entries = Object.entries(settings);

    return (
        <div>
            {entries
                .filter(([groupId]) => init[groupId as keyof typeof init])
                .map(
                    ([groupId, props]) =>
                        <PrismaSwitcher {...props} key={groupId} groupId={groupId} />
                )
            }
        </div>
    );
}