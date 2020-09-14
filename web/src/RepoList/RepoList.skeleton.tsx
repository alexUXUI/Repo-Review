import * as React from 'react';
import { Icon, List } from 'semantic-ui-react';

export const RepoListSkeleton = ({ numRows }: { numRows: number }) => {
  return (
    <div className="list--wrapper">
      <List divided relaxed className="repo__list">
        {
          Array.from(Array(numRows).keys()).map((row: number, index: number) => {
            return (<List.Item key={index}>
              <List.Icon name="github" size="big" verticalAlign="middle" />
              <List.Content>
                <List.Header as="a">
                  <div className="name-loading loading-skeleton">
                    {'    '}
                  </div>
                  <div className="list__icons">
                    <div className="list__icons__group loading-skeleton">
                      <Icon name="star" size="small" />
                    </div>
                    <div className="list__icons__group loading-skeleton">
                      <Icon name="clock" size="small" />
                    </div>
                  </div>
                </List.Header>
                <List.Description className="loading-skeleton list-description--loading"></List.Description>
                <List.Description className="loading-skeleton list-description--loading"></List.Description>
              </List.Content>
            </List.Item>)
          })
        }
      </List>
    </div>
  )
}
