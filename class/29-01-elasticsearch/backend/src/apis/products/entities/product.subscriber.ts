// Trigger를 이용해 Product 테이블에 상품이 등록되면 상품에 대한 로그가
// 생성되도록 할 것

import {
  Connection,
  EntitySubscriberInterface,
  InsertEvent,
  EventSubscriber,
} from 'typeorm';
import { Product } from './product.entity';
import { BigQuery } from '@google-cloud/bigquery';

// EntitySubscriberInterface<테이블명>에 정의된 메소드를 오버라이딩해서
// 사용할 수 있도록 상속
// <테이블명>에는 Trigger를 적용할 테이블명을 작성
@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
  constructor(connection: Connection) {
    // 생성자 안에 connection을 이용해 Product Entity와 연결
    // (typeorm의 connection은 db와의 연결을 control하는 기능을 제공)
    // connection.subscribers를 통해 특정 엔터티 이벤트를 수신할 수 있음
    // (이벤트 발생시 발생여부를 받아오는 것)
    // push를 통해 사용할 클래스를 적용
    // (여기서 this가 가리키는 것은 클래스 자기 자신인 ProductSubscriber)
    connection.subscribers.push(this);
  }

  // 이벤트를 수신할 엔티티를 return
  listenTo() {
    return Product;
  }

  // 이벤트 수신 후(해당 테이블에 데이터가 추가된 후) 실행되는 메소드
  // afterIsert를 통해 Product 테이블에 내용이 추가되면 로그가 생성되도록
  // ........
  // afterInsert는 트리거 후 실행되는 메소드
  // (따라서 해당 메소드에서 데이터가 BigQuery에 저장될 수 있도록 하면 됨)
  afterInsert(event: InsertEvent<Product>): void | Promise<any> {
    console.log(event); // 이벤트 확인
    // 객체 선언
    const bigquery = new BigQuery({
      // keFilename: BigQuer를 사용하기 위한 인증에 필요한 파일명
      // projectId: GCP에서 사용할 프로젝트 Id
      keyFilename: 'gcp-bigquery.json',
      projectId: 'backend-382717',
    });

    bigquery
      .dataset('mybigquery') // GCP-BigQuery에 생성한 DB명
      .table('productlog') // 테이블 명
      // DB에 추가될 내용
      .insert([
        {
          id: event.entity.id,
          name: event.entity.name,
          description: event.entity.description,
          price: event.entity.price,
          isSoldout: event.entity.isSoldout,
        },
      ]);
  }
}

// Trigger 실습
// Trigger : DB에 데이터가 저장되는 등 DML문(trigger)이 수행되었을 때,
// DB에서 자동으로 실행하게끔 작성된 프로그램 (집계자료 등)

// BigQuery : 대량의 데이터에 대한 SQL 쿼리를 빠르게 수행하는 platform의
//            서비스 중 하나