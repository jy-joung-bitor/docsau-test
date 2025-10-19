import { usePrisma } from './PrismaContext';
import { Props } from '@theme/Tabs';
import { useTabs } from '@docusaurus/theme-common/internal';
import init from './init.json' with { type: "json" };
import { Button, Label, ListBox, ListBoxItem, Popover, Select, SelectValue } from 'react-aria-components';

function PrismaSwitcher(props: Props) {
    const { groupId } = props;
    const lists = init[groupId] as Array<string>;
    const { selectedValue, selectValue, tabValues } = useTabs(props);
    const options = tabValues
        .filter(({ value }) => lists.includes(value))
        .map(({ value, label }) => ({ value, label }));

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
                        ({ value, label }) => (
                            <ListBoxItem id={value} textValue={value}>
                                <img src={`/img/tech/${value}.svg`} width={24} height={24} /> {label ?? value}
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