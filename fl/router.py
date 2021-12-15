from app import app, db
from flask import jsonify, request

from model import Table

@app.route('/')
def index():
    try:
        fieldFilters = ['title', 'count', 'distance']
        fieldSorts = ['title', 'count', 'distance']
        operations = ['like', '=', '>', '<']

        page = request.args.get('page')
        size = request.args.get('size')
        sort = request.args.get('sort')
        fieldSort = request.args.get('fieldSort')
        fieldFilter = request.args.get('fieldFilter')
        text = request.args.get('text')
        operation = request.args.get('operation')

        
        if page.isdigit():
            page = int(page)
        else:
            raise ValueError ( "Числовое значение!!" )
        if size.isdigit():
            size = int(size)
        else:
            raise ValueError ( "Числовое значение!!" )

        if (fieldFilter != '' and operation != '' and text != ''):
            if (fieldFilter in fieldFilters and operation in operations):
                if (fieldFilter == 'title'):
                    if operation == 'like':
                        filter_group =getattr(Table, fieldFilter).ilike(f'%{text}%')
                    if operation == '=':
                        filter_group =getattr(Table, fieldFilter)==(f'%{text}%')
                    if operation == '>':
                        filter_group =getattr(Table, fieldFilter)>(f'%{text}%')
                    if operation == '<':
                        filter_group =getattr(Table, fieldFilter)<(f'%{text}%')
                else:
                    if text.isdigit():
                        text = int(text)
                    else:
                        raise ValueError ( "Числовое значение!!" )
                    if operation == 'like'or operation == '=':
                        filter_group =getattr(Table, fieldFilter)==(text)
                    if operation == '>':
                        filter_group =getattr(Table, fieldFilter)>(text)
                    if operation == '<':
                        filter_group =getattr(Table, fieldFilter)<(text)

            if (fieldSort in fieldSorts):
                if (fieldSort):
                    if (sort == 'true'):
                        tables = Table.query.filter(filter_group).order_by(getattr(Table, fieldSort).desc()).paginate(page, size, False).items
                    else:
                        tables = Table.query.filter(filter_group).order_by(getattr(Table, fieldSort)).paginate(page, size, False).items
            else:
                tables = Table.query.filter(filter_group).paginate(page, size, False).items
            max_size = Table.query.filter(filter_group).count()
        else:
            if (fieldSort):
                if (fieldSort in fieldSorts):
                    if (sort == 'true'):
                        tables = Table.query.order_by(getattr(Table, fieldSort).desc()).paginate(page, size, False).items
                    else:
                        tables = Table.query.order_by(getattr(Table, fieldSort)).paginate(page, size, False).items
            else:
                tables = Table.query.paginate(page, size, False).items
            max_size = Table.query.count()

        serialized = []
        for rec in tables:
            serialized.append({
                'id': rec.id,
                'title': rec.title,
                'date': rec.date.strftime("%d.%m.%Y"),
                'count': rec.count,
                'distance': rec.distance,
            })

        return jsonify({'tables': serialized, 'max_size': max_size})
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500