"""Remove others table

Revision ID: f69233934d4b
Revises: f1c383b1d437
Create Date: 2024-10-11 13:16:49.054703

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = 'f69233934d4b'
down_revision = 'f1c383b1d437'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('school')
    op.drop_table('timerrr')
    op.drop_table('student')
    op.drop_table('class')
    op.drop_table('teacher')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('teacher',
    sa.Column('id', sa.UUID(), autoincrement=False, nullable=False),
    sa.Column('name', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('email', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('date_of_birth', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='teacher_pkey')
    )
    op.create_table('class',
    sa.Column('id', sa.UUID(), autoincrement=False, nullable=False),
    sa.Column('name', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('email', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('date_of_birth', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='class_pkey')
    )
    op.create_table('student',
    sa.Column('id', sa.UUID(), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='student_pkey')
    )
    op.create_table('timerrr',
    sa.Column('id', sa.UUID(), autoincrement=False, nullable=False),
    sa.Column('name', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('email', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('date_of_birth', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='timerrr_pkey')
    )
    op.create_table('school',
    sa.Column('id', sa.UUID(), autoincrement=False, nullable=False),
    sa.Column('name', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('email', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('date_of_birth', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='school_pkey')
    )
    # ### end Alembic commands ###